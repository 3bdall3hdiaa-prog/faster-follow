import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BalanceUsersDocument = HydratedDocument<BalanceUsers>;

@Schema()
export class BalanceUsers {
    @Prop()
    username: string;

    @Prop()
    amount: number; // أو number إذا تقدر تغيره



}

export const BalanceUsersSchema = SchemaFactory.createForClass(BalanceUsers);