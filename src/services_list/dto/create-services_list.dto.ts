import { IsNumber } from "class-validator";

export class CreateServicesListDto {
    @IsNumber()
    providerServiceId
}
