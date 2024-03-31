// status.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/modules/enums/order-status.enum';

export class OrderStatusDto {
    @IsEnum(OrderStatus)
    @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
    status: OrderStatus;
}
