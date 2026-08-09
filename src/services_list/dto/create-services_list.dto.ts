import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServicesListDto {
    services!: any
    @IsOptional()
    image?: any
    @IsOptional()
    refill?: boolean
    @IsString()
    providerServiceId!: string;
    @IsString()
    provider!: string;
    @IsString()
    platform!: string;
    @IsString()
    title!: string
    @IsNumber()
    price!: number
    @IsNumber()
    providerRate!: number
    @IsNumber()
    min!: number
    @IsNumber()
    max!: number
    @IsString()
    type?: string
    @IsString()
    description?: string
    @IsString()
    descriptionAr?: string
    @IsOptional()
    @IsBoolean()
    status?: string
    @IsString()
    @IsOptional()
    @Transform(({ value }) => (100 - value) / 100)
    discount_for_2000!: number
    @IsOptional()
    @Transform(({ value }) => (100 - value) / 100)
    discount_for_3000!: number
    @IsOptional()
    @Transform(({ value }) => (100 - value) / 100)
    discount_for_4000!: number
    @IsOptional()
    @Transform(({ value }) => (100 - value) / 100)
    discount_for_greater_than_4000!: number
    @IsOptional()
    @Transform(({ value }) => (100 - value) / 100)
    discount_for_greater_than_100000!: number
}
