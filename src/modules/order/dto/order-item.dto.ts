import { IsNotEmpty, IsString } from "class-validator";

export class OrderItemDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    quantity: number;
}