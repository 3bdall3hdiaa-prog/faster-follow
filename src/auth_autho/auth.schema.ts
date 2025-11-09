// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // timestamps بتضيف createdAt و updatedAt تلقائي
export class User {
    @Prop({ required: true, unique: true })
    username: string;
    @Prop({ required: false }) // معناها عادي لو كتبتها او مكتبتهاش بس انا كاتبه عشان في انشاء الحساب يحطلي وظيفه اللي هي يوزر عشان لما اجي ابعت الباي لود الاقي وظيفه ابعتها 
    role: string;

    @Prop({ unique: true })

    email: string;

    @Prop({ type: 'string', required: true, min: (3), max: (20) })
    password: string;
    // @Prop({ default: 0 })
    // balance: number
    @Prop({ default: 'active' })
    status: string
    @Prop({ default: false })
    is2FA: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
