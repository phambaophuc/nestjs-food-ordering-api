import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";

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

    @Exclude({ toPlainOnly: true })
    @Prop({ type: Date })
    createdAt: Date;

    @Exclude({ toPlainOnly: true })
    @Prop({ type: Date })
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);