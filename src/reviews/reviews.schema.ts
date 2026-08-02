import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewsDocument = HydratedDocument<Reviews>;

@Schema({ timestamps: true })
export class Reviews {
    @Prop()
    username!: string

    @Prop({ type: Types.ObjectId, ref: 'auth_autho' })
    userId!: Types.ObjectId

    @Prop()
    comment!: string

    @Prop()
    rating!: number

    @Prop({ type: Types.ObjectId, ref: 'ServicesList' })
    serviceId!: Types.ObjectId

    @Prop({ default: false })
    isPublished!: boolean
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);