import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TechnicalSupportDocument = HydratedDocument<TechnicalSupport>;

@Schema({ timestamps: true })
export class TechnicalSupport {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ default: 'Open' })
    status: string;

    @Prop()
    username: string;

    // 🟢 الحقل الجديد للمحادثات
    @Prop({
        type: [
            {
                sender: String,
                text: String,
                createdAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    })
    messages: { sender: string; text: string; createdAt?: Date }[];
}

export const TechnicalSupportSchema = SchemaFactory.createForClass(TechnicalSupport);
