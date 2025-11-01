import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ManagePagesDocument = HydratedDocument<ManagePages>;

@Schema({ timestamps: true })
export class ManagePages {

    @Prop()
    title: string;
    @Prop()
    slug: string;
    @Prop()
    content: string; // HTML content
    @Prop({ default: false })
    isPublished: boolean;
}

export const ManagePagesSchema = SchemaFactory.createForClass(ManagePages);