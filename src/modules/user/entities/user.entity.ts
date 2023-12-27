import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    username: string;

    @Exclude()
    @Prop({ required: true })
    password: string;

    @Prop()
    fullName: string;

    @Prop()
    address: string;

    @Prop()
    phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
