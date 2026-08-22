import { IsMongoId, MinLength, MaxLength, IsNumber, IsString, Min, Max, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsMongoId()
    @IsNotEmpty()
    userId!: string;

    @IsOptional()
    isPublished?: boolean;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(500)
    comment!: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating!: number;

    @IsMongoId()
    @IsNotEmpty()
    serviceId!: string;
}