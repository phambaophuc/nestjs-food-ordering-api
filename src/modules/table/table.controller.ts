import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TableService } from './table.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTableDto } from './dto/create-table.dto';
import { BookingTableDto } from './dto/booking-table.dto';
import { TableStatus } from '../enums/table-status.enum';

@Controller('tables')
@ApiTags('Table Controller')
export class TableController {

    constructor(private readonly tableService: TableService) { }

    @Post()
    async create(@Body() createTableDto: CreateTableDto) {
        const newOrder = await this.tableService.create(createTableDto);
        return newOrder;
    }

    @Get()
    async findAll() {
        try {
            const tables = await this.tableService.findAll();
            return tables;
        } catch (error) {
            return { message: 'Error get tables', status: 500 };
        }
    }

    @Put('/:tableNumber/booking')
    async bookingTable(@Param('tableNumber') tableNumber: number, @Body() booking: BookingTableDto) {
        try {
            const reservedTable = await this.tableService.bookingTable(tableNumber, booking);
            return { message: 'Table reserved successfully', table: reservedTable };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { message: error.message, status: 404 };
            }
            return { message: 'Error reserving table', status: 500 };
        }
    }

    @Put('/:tableNumber/:status')
    async releaseTable(@Param('tableNumber') tableNumber: number, @Param('status') status: string) {
        status = status.toLowerCase();
        try {
            if (status == TableStatus.RESERVED.toLowerCase()) {
                const releasedTable = await this.tableService.releaseTable(tableNumber);
                return { message: 'Table released successfully', table: releasedTable };
            } else if (status == TableStatus.OCCUPIED.toLowerCase()) {
                const occupiedTable = await this.tableService.occupyTable(tableNumber);
                return { message: 'Table occupied successfully', table: occupiedTable };
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { message: error.message, status: 404 };
            }
            return { message: 'Error releasing table', status: 500 };
        }
    }
}
