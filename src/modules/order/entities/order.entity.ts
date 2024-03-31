import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderItemDto } from "../dto/order-item.dto";
import { OrderStatus } from "src/modules/enums/order-status.enum";

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

    @Prop({ required: true })
    items: OrderItemDto[];

    @Prop()
    tableNumber: number;

    @Prop({ default: OrderStatus.PENDING, enum: OrderStatus })
    status: OrderStatus;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);