import { HttpException, Injectable } from '@nestjs/common';
import { CreateNewOrderDto } from './dto/create-new_order.dto';
import { UpdateNewOrderDto } from './dto/update-new_order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './new_order.schema';
import { Model } from 'mongoose';
import axios from 'axios';
import { ManageProvidersDocument } from 'src/manage-providers/schema';
// import { NotificationDocument } from 'src/notification/motification.schema';
@Injectable()
export class NewOrderService {
  constructor(@InjectModel('NewOrder') private readonly newOrderModel: Model<UserDocument>,
    @InjectModel('ManageProviders') private readonly providerModel: Model<ManageProvidersDocument>,
  ) { }
  async create(createNewOrderDto: CreateNewOrderDto) {
    try {
      // أولًا نحفظ الطلب في قاعدة البيانات بحالة مبدئية pending
      const newOrder = await this.newOrderModel.create({
        ...createNewOrderDto,
        status: 'pending',
      });

      const provider = await this.providerModel.findOne({
        name: newOrder.provider, // نفس الاسم اللي جاي من الفرونت
      });
      if (!provider) {
        throw new Error(`لم يتم العثور على مزود بهذا الاسم: ${newOrder.provider}`);
      }
      console.log(provider);
      const providerUrl = provider.apiEndpoint;
      const apiKey = provider.apiKey;

      // إعداد بيانات الطلب للمزود JustAnotherPanel
      const payload = new URLSearchParams();
      payload.append('key', apiKey); // ⚠️ استبدل بمفتاحك من الموقع
      payload.append('action', 'add');
      payload.append('service', String(createNewOrderDto.selectedServiceId));
      payload.append('link', createNewOrderDto.link);
      payload.append('quantity', String(createNewOrderDto.quantity));

      // إرسال الطلب للمزود
      const response = await axios.post(providerUrl, payload);

      // لو العملية نجحت عند المزود
      if (response.data.order) {
        // نحدّث الطلب في قاعدة البيانات
        await this.newOrderModel.findByIdAndUpdate(newOrder._id, {
          providerOrderId: response.data.order, // رقم الطلب من المزود
          status: 'processing',
        });


        return {
          success: true,
          message: 'تم إنشاء الطلب بنجاح وإرساله إلى المزود.',
          providerOrderId: response.data.order,
        };
      } else {
        // لو المزود رجّع خطأ
        await this.newOrderModel.findByIdAndUpdate(newOrder._id, {
          status: 'failed',
        });
        throw new HttpException(
          `فشل إرسال الطلب إلى المزود: ${response.data.error || 'غير معروف'}`,
          400,
        );
      }
    } catch (error) {
      throw new HttpException(`حدث خطأ أثناء إنشاء الطلب: ${error.message}`, 500);
    }
  }


  async checkOrderStatus(orderId: string) {
    try {
      // نجيب الطلب من قاعدة البيانات
      const order = await this.newOrderModel.findOne({ providerOrderId: orderId });
      if (!order) throw new HttpException('الطلب غير موجود', 404);

      // نجيب المزود من قاعدة البيانات
      const provider = await this.providerModel.findOne({ name: order.provider });
      if (!provider) throw new HttpException('المزود غير موجود', 404);

      // إعداد البيانات
      const payload = new URLSearchParams();
      payload.append('key', provider.apiKey);
      payload.append('action', 'status');
      payload.append('order', order.providerOrderId.toString());

      // نطلب حالة الطلب من المزود
      const response = await axios.post(provider.apiEndpoint, payload);

      // لو رجع المزود حالة
      if (response.data.status) {
        const newStatus = response.data.status.toLowerCase(); // Completed / Pending / In progress / Canceled
        await this.newOrderModel.findByIdAndUpdate(order._id, { status: newStatus });

        return {
          success: true,
          providerOrderId: order.providerOrderId,
          providerStatus: response.data.status,
          remains: response.data.remains,
        };
      } else {
        throw new HttpException('لم يتم العثور على حالة للطلب من المزود', 400);
      }
    } catch (error) {
      throw new HttpException(`فشل في جلب حالة الطلب: ${error.message}`, 500);
    }
  }



  async findAll() {
    const data = await this.newOrderModel.find();
    return data
  }

  findOne(id: number) {
    return `This action returns a #${id} newOrder`;
  }

  async update(id: string, updateNewOrderDto: UpdateNewOrderDto) {
    const user = await this.newOrderModel.findById(id)
    if (!user) throw new HttpException("user not found", 404);
    const data = await this.newOrderModel.findOneAndUpdate({ _id: id }, { ...updateNewOrderDto }, { new: true });
    return data

  }

  async remove(id: string) {
    const user = await this.newOrderModel.findById(id)
    if (!user) throw new HttpException("user not found", 404);
    await this.newOrderModel.findOneAndDelete({ _id: id });
  }
}
