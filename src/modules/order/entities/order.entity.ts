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

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);