import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {
    @Prop()
    userName: string;
    @Prop()
    text: string;
    @Prop()
    isRead: boolean;

}

export const NotificationSchema = SchemaFactory.createForClass(Notification);