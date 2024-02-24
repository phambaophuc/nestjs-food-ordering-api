import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @ApiProperty()
    items: OrderItemDto[];

    @IsNotEmpty()
    @ApiProperty()
    tableNumber: number;
}
