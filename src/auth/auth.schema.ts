// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'auth_authos', timestamps: true })
export class User {
    @Prop({ required: true, unique: true, index: true })
    email: string;

    @Prop({ index: true })
    username: string;

    @Prop()
    name: string;

    @Prop()
    picture: string;

    @Prop({ default: 0 })
    balance: number;

    @Prop({ default: 'client' })
    role: string;

    @Prop({ unique: true, sparse: true })
    googleId: string;

    @Prop({ default: false })
    emailVerified: boolean;

    @Prop({ default: 'local' })
    provider: string;
    // @Prop()
    // balance: number;
    @Prop()
    password: string; // لو هتسجل دخول عادي
    @Prop({ default: 'active' })
    status: string;
    @Prop({ type: Object, default: {} })
    otp!: {
        code: number,
        expiry: Date,

    }
}

export const UserSchema = SchemaFactory.createForClass(User);