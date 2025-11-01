import { IsEmail, IsString } from "class-validator";

export class CreateManageUserDto {
    @IsString()
    username: string
    @IsString()
    role: string
    @IsEmail()
    email: string


    @IsString()
    password: string
    @IsString()
    status: string

}
