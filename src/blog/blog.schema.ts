import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
    @Prop()
    title: string;

    @Prop()
    link: string;

    @Prop()
    extract: string;
    @Prop()
    content: string;
    @Prop()
    urlimage: string;

    @Prop()
    author: string;
    @Prop()
    status: string
    @Prop()
    Metatitle: string
    @Prop()
    Metadescription: string
}

export const BlogSchema = SchemaFactory.createForClass(Blog);