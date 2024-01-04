import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderItemDto } from "../dto/order-item.dto";

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

    @Prop({ required: true })
    items: OrderItemDto[];

    @Prop()
    tableNumber: number;

    @Prop({ default: 'pending' })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);