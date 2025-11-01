import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateNewOrderDto {
    @IsString()
    @IsNotEmpty()
    selectedServiceId: string; // _id من services-list (ObjectId)

    @IsString()
    @IsNotEmpty()
    link: string;

    @IsNumber()
    quantity: number;
}
