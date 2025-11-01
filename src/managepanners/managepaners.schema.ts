import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ManagePannersDocument = HydratedDocument<ManagePanners>;

@Schema()
export class ManagePanners {
    @Prop()
    title: string;
    @Prop()
    subtitle: string;
    @Prop()
    ctaText: string;
    @Prop()
    ctaLink: string;
    @Prop()
    imageUrl: string;
    @Prop()
    isActive: boolean;
}

export const ManagePannersSchema = SchemaFactory.createForClass(ManagePanners);