import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Table, TableDocument } from './entities/table.entity';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TableService {

    constructor(
        @InjectModel(Table.name) private readonly tableModel: Model<TableDocument>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) { }

    async findAll(): Promise<TableDocument[]> {
        return this.tableModel.find().exec();
    }

    async getTablesByStatus(status: string): Promise<TableDocument[]> {
        const tables = await this.tableModel.find({ status }).exec();
        return tables;
    }

    async reserveTable(tableNumber: number): Promise<TableDocument> {
        const table = await this.tableModel.findOne({ tableNumber }).exec();
        if (!table) {
            throw new NotFoundException(`Table with number ${tableNumber} not found`);
        }

        if (table.status !== 'available') {
            throw new NotFoundException(`Table with number ${tableNumber} is not available`);
        }

        table.status = 'reserved';
        await this.cacheService.del(`order_${tableNumber}`);

        return table.save();
    }

    async occupyTable(tableNumber: number): Promise<TableDocument> {
        const table = await this.tableModel.findOne({ tableNumber }).exec();
        if (!table) {
            throw new NotFoundException(`Table with number ${tableNumber} not found`);
        }

        if (table.status !== 'available' && table.status !== 'reserved') {
            throw new NotFoundException(`Table with number ${tableNumber} cannot be occupied`);
        }

        table.status = 'occupied';

        return table.save();
    }

    async releaseTable(tableNumber: number): Promise<TableDocument> {
        const table = await this.tableModel.findOne({ tableNumber }).exec();
        if (!table) {
            throw new NotFoundException(`Table with number ${tableNumber} not found`);
        }

        table.status = 'available';

        return table.save();
    }
}
