import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './pay-pal.shema';
import { NotificationDocument } from 'src/notification/motification.schema';
dotenv.config();

@Injectable()
export class PaypalService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel('Notification') private readonly Notification: Model<NotificationDocument>
  ) { }

  private clientId = process.env.PAYPAL_CLIENT_ID;
  private clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  private baseUrl = process.env.PAYPAL_API;

  // ✅ الحصول على access token
  private async getAccessToken(): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          auth: {
            username: this.clientId!,
            password: this.clientSecret!,
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );
      return response.data.access_token;
    } catch (error) {
      console.error('PayPal Auth Error:', error.response?.data || error.message);
      throw new InternalServerErrorException('Failed to get PayPal access token');
    }
  }

  // ✅ إنشاء order
  // ...
  async createOrder(amount: string, userName: string) {
    try {
      const accessToken = await this.getAccessToken();

      const response = await axios.post(
        `${this.baseUrl}/v2/checkout/orders`,
        {
          intent: 'CAPTURE',
          application_context: {
            return_url: `http://localhost:3001/paypal/capture-order?user=${encodeURIComponent(userName)}`,
            cancel_url: process.env.API_FRONT,
          },
          purchase_units: [
            {
              amount: { currency_code: 'USD', value: amount },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Create Order Error:', error.response?.data || error.message);
      throw new InternalServerErrorException('Failed to create PayPal order');
    }
  }

  // ✅ Capture بعد الدفع + حفظ البيانات في MongoDB
  async captureOrder(orderId: string, userName: string) {
    if (!orderId) throw new Error('Missing orderId');

    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.post(
        `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        },
      );

      const data = response.data;
      const transaction = data.purchase_units[0].payments.captures[0];

      // 🔹 إنشاء سجل جديد في قاعدة البيانات مع اسم المستخدم
      const newPayment = await this.paymentModel.create({
        transactionId: transaction.id,
        amount: transaction.amount.value,
        currency: transaction.amount.currency_code,
        status: transaction.status,
        userName, // ✅ تخزين اسم المستخدم
      });
      await this.Notification.create({ userName, text: 'عملية الدفع تمت بنجاح', isRead: false })

      return { message: 'Payment captured and saved', payment: newPayment };
    } catch (error) {
      console.error('Capture Order Error:', error.response?.data || error.message);
      throw new InternalServerErrorException(
        'Failed to capture PayPal order: ' + (error.response?.data?.message || error.message),
      );
    }
  }
  async getdatapayment() {
    const data = await this.paymentModel.find({});
    return data
  }
}
