import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TableDocument = Table & Document;

@Schema({ timestamps: true })
export class Table {
    @Prop({ required: true, unique: true })
    tableNumber: number;

    @Prop({ default: 'available', enum: ['available', 'reserved', 'occupied'] })
    status: string;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const TableSchema = SchemaFactory.createForClass(Table);