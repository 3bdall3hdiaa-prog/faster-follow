import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CoponsDocument = HydratedDocument<Copons>;

@Schema({ timestamps: true })
export class Copons {
    @Prop()
    amount: string;
    @Prop({ unique: true })
    code: string;
    @Prop({ default: false })
    used: boolean


}

export const CoponsSchema = SchemaFactory.createForClass(Copons);