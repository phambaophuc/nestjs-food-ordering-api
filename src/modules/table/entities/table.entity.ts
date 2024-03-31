import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TableStatus } from 'src/modules/enums/table-status.enum';

export type TableDocument = Table & Document;

@Schema({ timestamps: true })
export class Table {
    @Prop({ required: true, unique: true })
    tableNumber: number;

    @Prop({ default: TableStatus.AVAILABLE, enum: TableStatus })
    status: TableStatus;

    @Prop()
    bookingTime: string;

    @Prop()
    customer: string;

    @Prop()
    phoneNumber: string;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt: Date;
}

export const TableSchema = SchemaFactory.createForClass(Table);