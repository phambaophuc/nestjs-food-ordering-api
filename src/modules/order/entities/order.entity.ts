import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { OrderItemDto } from "../dto/order-item.dto";
import mongoose from "mongoose";

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

    @Prop({ required: true })
    items: OrderItemDto[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ default: 'pending' })
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);