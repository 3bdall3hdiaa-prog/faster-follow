import { Prop } from "@nestjs/mongoose";
import { MinLength } from "class-validator";
export class CreateUserDto {
    @Prop()
    @MinLength(3, { message: "كلمة السر يجب ان تكون على الاقل 3 حروف" })
    email: string
    @Prop()
    currentPassword: string
    @Prop()
    @MinLength(3, { message: "كلمة السر يجب ان تكون على الاقل 3 حروف" })
    confirmPassword: string
    @Prop()
    @MinLength(3, { message: "كلمة السر يجب ان تكون على الاقل 3 حروف" })
    newPassword: string

}
