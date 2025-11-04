import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResetPasswordDocument = HydratedDocument<ResetPassword>;

@Schema()
export class ResetPassword {
    @Prop()
    verificationCode: number;
    @Prop()
    email: string
}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);