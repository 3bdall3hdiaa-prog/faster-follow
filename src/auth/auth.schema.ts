// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'auth_authos', timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop()
    username: string;

    @Prop()
    name: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    picture: string;

    @Prop({ default: 0 })
    balance: number;

    @Prop({ default: 'client' })
    role: string;

    @Prop({ unique: true, sparse: true })
    googleId: string;

    @Prop()
    accessToken: string;

    @Prop()
    refreshToken: string;

    @Prop({ default: false })
    emailVerified: boolean;

    @Prop({ default: 'google' })
    provider: string;
    // @Prop()
    // balance: number;
    @Prop()
    password: string; // لو هتسجل دخول عادي
    @Prop({ default: 'active' })
    status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);