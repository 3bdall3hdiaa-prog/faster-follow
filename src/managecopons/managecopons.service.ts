import { Injectable } from '@nestjs/common';
import { CreateManagecoponDto } from './dto/create-managecopon.dto';
import { UpdateManagecoponDto } from './dto/update-managecopon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CoponsDocument } from './copons.schema';
import { Model } from 'mongoose';
import { Payment } from '../pay-pal/pay-pal.shema';
import { HttpException } from '@nestjs/common';
import { NotificationDocument } from 'src/notification/motification.schema';
@Injectable()
export class ManagecoponsService {
  constructor(@InjectModel('Payment') private readonly userModel: Model<Payment>,
    @InjectModel("Managecopon") private copon: Model<CoponsDocument>,
    @InjectModel('Notification') private readonly Notification: Model<NotificationDocument>,) { }
  async create(createManagecoponDto: CreateManagecoponDto) {
    const createdManagecopon = new this.copon(createManagecoponDto);
    return await createdManagecopon.save();
  }

  async findAll() {
    const data = await this.copon.find();
    return data
  }

  async findOne(data: any) {
    const { code, userName } = data;

    // 1️⃣ نتحقق إن الكوبون موجود
    const coupon = await this.copon.findOne({ code });
    if (!coupon)
      throw new HttpException("الكوبون غير موجود", 404);

    // 2️⃣ نتحقق هل تم استخدامه بالفعل
    if (coupon.used)
      throw new HttpException("الكوبون تم استخدامه بالفعل", 400);

    // 3️⃣ تحديث حالة الكوبون
    coupon.used = true;
    await coupon.save(); // نحفظ التغيير

    // 4️⃣ إنشاء سجل في مدفوعات المستخدم
    const payment = await this.userModel.create({
      userName,
      amount: coupon.amount,
      method: "copon",
      code: coupon.code
    });

    if (!payment)
      throw new HttpException("فشل إنشاء سجل الدفع", 500);

    await this.Notification.create({ userName, text: 'تم إنشاء الطلب بنجاح وإرساله إلى المزود.', isRead: false })

    // 5️⃣ ترجع البيانات
    return {
      message: `تم تطبيق الكوبون بنجاح ✅ , لقد حصلت علي  ${coupon.amount}دولار على حسابك`,
      data: payment
    };
  }


  async update(id: string, updateManagecoponDto: UpdateManagecoponDto) {
    const updatedManagecopon = await this.copon.findByIdAndUpdate(id, updateManagecoponDto, { new: true });
    return updatedManagecopon
  }

  async remove(id: string) {
    await this.copon.findByIdAndDelete(id);
  }
}
