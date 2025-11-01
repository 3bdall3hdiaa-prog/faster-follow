import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ManageProvidersDocument = HydratedDocument<ManageProviders>;

@Schema()
export class ManageProviders {
    @Prop()
    name: string;

    @Prop()
    apiEndpoint: string;

    @Prop()
    apiKey: string;
    @Prop()
    status: string
}

export const ManageProvidersSchema = SchemaFactory.createForClass(ManageProviders);