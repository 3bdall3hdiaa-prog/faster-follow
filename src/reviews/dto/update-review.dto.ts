import { IsMongoId, MinLength, MaxLength, IsNumber, IsString, Min, Max, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateReviewDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(500)
    comment?: string;

    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(5)
    rating?: number;
}