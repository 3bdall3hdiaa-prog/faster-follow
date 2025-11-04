import { IsEmail, IsEmpty, IsNumber, Min, MinLength } from "class-validator";

export class CreateResetpasswordDto {
    @IsNumber()
    verificationCode: number
    @IsEmail()
    email: string
}
export class ChangePassword {

    @MinLength(3, { message: "كلمة السر يجب ان تكون على الاقل 3 حروف" })
    password: string
    @IsEmail()
    email: string
}
