import { IsString, IsUrl } from "class-validator";

export class CreateManageProviderDto {
    @IsString()
    name: string;
    @IsUrl()
    apiEndpoint: string;
    @IsString()
    apiKey: string;
    @IsString()
    status: string
}
