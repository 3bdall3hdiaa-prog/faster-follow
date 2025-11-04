import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ManagePaymentsDocument = HydratedDocument<ManagePayments>;

@Schema()
export class ManagePayments {
    @Prop()
    id: string;
    @Prop()
    name: string;
    @Prop()
    url: string;
    @Prop()
    icon: string;
    @Prop()
    description: string;
}

export const ManagePaymentsSchema = SchemaFactory.createForClass(ManagePayments);