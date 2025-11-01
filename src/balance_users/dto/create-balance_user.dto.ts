import { IsString, Min, MIN, MinLength } from "class-validator";

export class CreateBalanceUserDto {
    @IsString()
    userName: string;


    amount: number
}
