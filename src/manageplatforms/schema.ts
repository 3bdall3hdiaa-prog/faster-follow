import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ManagePlatformsDocument = HydratedDocument<ManagePlatforms>;
@Schema()
export class ManagePlatforms {
    @Prop({ unique: true, required: true })
    slug: string;
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({ type: Object, required: false })
    image: {
        url: string,
        public_id: string
    };

}

export const ManagePlatformsSchema = SchemaFactory.createForClass(ManagePlatforms);