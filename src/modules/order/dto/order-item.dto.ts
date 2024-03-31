import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class OrderItemDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    productId: string;

    @IsNotEmpty()
    @ApiProperty()
    quantity: number;
}