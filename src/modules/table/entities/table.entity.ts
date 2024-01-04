import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TableDocument = Table & Document;

@Schema()
export class Table {
    @Prop({ required: true, unique: true })
    tableNumber: number;

    @Prop({ default: 'available', enum: ['available', 'reserved', 'occupied'] })
    status: string;
}

export const TableSchema = SchemaFactory.createForClass(Table);