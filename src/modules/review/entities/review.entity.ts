import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    comment: string;

    @Exclude({ toPlainOnly: true })
    @Prop({ type: Date })
    createdAt: Date;

    @Exclude({ toPlainOnly: true })
    @Prop({ type: Date })
    updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);