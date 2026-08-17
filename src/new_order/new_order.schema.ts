// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUrl } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { ManageProviders } from '../manage-providers/schema';
import { Types } from 'mongoose';
import { ServicesList } from 'src/services_list/services_list.schema';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // timestamps بتضيف createdAt و updatedAt تلقائي
export class User {
    @Prop({ unique: true, required: true })
    id!: number
    @Prop()
    selectedCategory: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'ServicesList' })
    serviceId: ServicesList;
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
    @Prop({ type: 'number' })
    startCount: number;
    @Prop({ type: 'number' })
    remains: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
