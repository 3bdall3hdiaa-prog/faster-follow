import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ManageProviders } from '../manage-providers/schema'; // استيراد المزود

export type ServicesListDocument = HydratedDocument<ServicesList>;

@Schema({ timestamps: true })
export class ServicesList {
    // رقم الخدمة عند المزود (مهم جدًا)
    @Prop({ required: true })
    providerServiceId: number;

    // مرجع للمزود اللي الخدمة جاية منه
    @Prop({ type: Types.ObjectId, ref: 'Provider', required: true })
    provider: ManageProviders;

    // المنصة (زي Instagram / YouTube / TikTok)
    @Prop({ required: true })
    platform: string;

    // اسم الخدمة عندك (ممكن يكون مختلف عن المزود)
    @Prop({ required: true })
    title: string;

    // السعر لكل 1000 وحدة عندك (اللي العميل بيشوفه)
    @Prop({ required: true })
    price: number;

    // السعر الحقيقي عند المزود (عشان تعرف مكسبك)
    @Prop({ required: true })
    providerRate: number;

    // الحد الأدنى
    @Prop({ required: true })
    min: number;

    // الحد الأقصى
    @Prop({ required: true })
    max: number;

    // نوع الخدمة (default / drip-feed / custom comments...)
    @Prop()
    type?: string;

    // وصف الخدمة أو ملاحظات عنها
    @Prop()
    description?: string;

    // هل الخدمة نشطة ومفعلة للعرض في موقعك
    @Prop({ default: true })
    status: boolean;
    @Prop()
    imageUrl: string
}

export const ServicesListSchema = SchemaFactory.createForClass(ServicesList);
