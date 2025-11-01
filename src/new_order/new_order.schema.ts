// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUrl } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { ManageProviders } from '../manage-providers/schema';
import { Types } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // timestamps بتضيف createdAt و updatedAt تلقائي
export class User {
    @Prop()
    selectedCategory: string;
    @Prop({ default: () => Math.floor(1000 + Math.random() * 9000) })
    order_number: string
    @Prop({ required: false })
    selectedServiceId: number;
    @IsUrl()
    @Prop()
    link: string;
    @Prop({ type: 'number', required: true, min: (1) })
    quantity: number;
    @Prop()
    totalCost: number
    @Prop()
    status: string
    @Prop()
    username: string
    @Prop()
    id_user: string
    @Prop()
    serviceTitle: string
    @Prop({ type: Types.ObjectId, ref: 'ManageProviders' })
    provider: ManageProviders;
    @Prop()
    providerOrderId: string

}

export const UserSchema = SchemaFactory.createForClass(User);
