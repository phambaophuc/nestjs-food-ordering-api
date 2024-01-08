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

    @Prop({ required: true })
    type: string;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);