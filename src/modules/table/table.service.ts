import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table, TableDocument } from './entities/table.entity';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateTableDto } from './dto/create-table.dto';
import { BookingTableDto } from './dto/booking-table.dto';
import { TableStatus } from '../enums/table-status.enum';

@Injectable()
export class TableService {

    constructor(
        @InjectModel(Table.name) private readonly tableModel: Model<TableDocument>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) { }

    async create(createTableDto: CreateTableDto): Promise<CreateTableDto> {
        const table = new this.tableModel(createTableDto);
        return table.save();
    }

    async findAll(): Promise<TableDocument[]> {
        return this.tableModel.find().exec();
    }

    async findByNumber(number: number): Promise<TableDocument> {
        return this.tableModel.findOne({ tableNumber: number }).exec();
    }

    // async getTablesByStatus(status: string): Promise<TableDocument[]> {
    //     const tables = await this.tableModel.find({ status }).exec();
    //     return tables;
    // }

    async bookingTable(tableNumber: number, booking: BookingTableDto): Promise<TableDocument> {
        const table = await this.tableModel.findOne({ tableNumber }).exec();
        if (!table) {
            throw new NotFoundException(`Table with number ${tableNumber} not found`);
        }

        if (table.status !== TableStatus.AVAILABLE) {
            throw new NotFoundException(`Table with number ${tableNumber} is not available`);
        }

        table.status = TableStatus.RESERVED;
        table.bookingTime = booking.bookingTime;
        table.customer = booking.customer;
        table.phoneNumber = booking.phoneNumber;
        await this.cacheService.del(`order_${tableNumber}`);

        return table.save();
    }

    async occupyTable(tableNumber: number): Promise<TableDocument> {
        const table = await this.tableModel.findOne({ tableNumber }).exec();
        if (!table) {
            throw new NotFoundException(`Table with number ${tableNumber} not found`);
        }

        if (table.status !== TableStatus.AVAILABLE && table.status !== TableStatus.RESERVED) {
            throw new NotFoundException(`Table with number ${tableNumber} cannot be occupied`);
        }

        table.status = TableStatus.OCCUPIED;

        return table.save();
    }

    async releaseTable(tableNumber: number): Promise<TableDocument> {
        const table = await this.tableModel.findOne({ tableNumber }).exec();
        if (!table) {
            throw new NotFoundException(`Table with number ${tableNumber} not found`);
        }

        table.bookingTime = undefined;
        table.customer = undefined;
        table.phoneNumber = undefined;
        table.status = TableStatus.AVAILABLE;

        return table.save();
    }
}
