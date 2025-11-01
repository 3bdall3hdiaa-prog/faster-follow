import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString({ message: " اسم المستخدم يجب ان يكون نص" })
    @MinLength(3, { message: "الاسم يجب ان يكون على الاقل 3 حروف" })
    username: string;
    @IsString({ message: " البريد الالكتروني يجب ان يكون نص" })
    @IsEmail({}, { message: " البريد الالكتروني غير صحيح" })
    @IsOptional()
    email: string;
    @IsString({ message: " كلمة السر يجب ان تكون نص " })
    @MinLength(3, { message: " كلمة السر يجب ان تكون على الاقل 3 حروف" }) // required طبعا انا قايله ققل قيمه تلتله دي تعني حجتين انه هيدخل اقل حاجه تلت حروف وتاني حاجه انه كدا االباس هيبقي 
    password: string;


}
