import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ManageProviders } from '../manage-providers/schema'; // استيراد المزود

export type ServicesListDocument = HydratedDocument<ServicesList>;

@Schema({ timestamps: true })
export class ServicesList {
    @Prop({ required: true, unique: true })
    id!: number;
    @Prop({ required: true })
    providerServiceId!: number;

    @Prop({ type: Types.ObjectId, ref: 'ManageProviders', required: true })
    provider!: ManageProviders;

    @Prop({ required: true })
    platform!: string;

    @Prop({ required: true })
    title!: string;

    @Prop({ required: true })
    price!: number;

    //السعر الحقيقي عند المزود 
    @Prop({ required: true })
    providerRate!: number;

    // الحد الأدنى
    @Prop({ required: true })
    min!: number;

    // الحد الأقصى
    @Prop({ required: true })
    max!: number;

    // نوع الخدمة (default / drip-feed / custom comments...)
    @Prop()
    type?: string;

    @Prop()
    description?: string;

    @Prop({ default: true })
    status!: boolean;

    @Prop({ type: Object })
    image!: {
        url: string,
        public_id: string
    }
    @Prop()
    descriptionAr!: string

    @Prop({ default: false })
    refill!: boolean

    @Prop({
        type: [
            {
                from: { type: Number },
                to: { type: Number },
                discount: { type: Number },
            },
        ],
        default: [],
    })
    discounts!: {
        from: number;
        to: number;
        discount: number;
    }[];
    @Prop()
    guarantee?: string
    @Prop()
    perDay?: string

}

export const ServicesListSchema = SchemaFactory.createForClass(ServicesList);
