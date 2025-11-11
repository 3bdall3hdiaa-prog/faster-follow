import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ManagePlatformsDocument = HydratedDocument<ManagePlatforms>;
@Schema()
export class ManagePlatforms {
    @Prop()
    id: string;
    @Prop()
    name: string;
    @Prop()
    iconUrl: string;

}

export const ManagePlatformsSchema = SchemaFactory.createForClass(ManagePlatforms);