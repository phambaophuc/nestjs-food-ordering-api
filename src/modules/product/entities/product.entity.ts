import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {

    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop()
    img: string;

    @Prop({ required: true })
    price: number;

    @Prop({ default: 0, type: 'number' })
    quantity: number;

    @Prop({ required: true })
    type: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);