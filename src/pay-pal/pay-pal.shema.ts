import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Payment extends Document {
    @Prop()
    transactionId: string;

    @Prop()
    amount: string;

    @Prop()
    currency: string;

    @Prop()
    status: string;
    @Prop()
    userName: string;
    @Prop({ unique: true })
    code: string

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
