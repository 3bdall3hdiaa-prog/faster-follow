import { IsString } from "class-validator";

export class CreateManagecoponDto {
    @IsString()
    copon: string;
}
