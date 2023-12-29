import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('table')
@ApiTags('table')
export class TableController {

    constructor(private readonly tableService: TableService) { }

    @Get()
    async findAll() {
        try {
            const tables = await this.tableService.findAll();
            return tables;
        } catch (error) {
            return { message: 'Error get tables', status: 500 };
        }
    }

    @Get('status/:status')
    async getTablesByStatus(@Param('status') status: string) {
        try {
            const tables = await this.tableService.getTablesByStatus(status);
            return tables;
        } catch (error) {
            return { message: 'Error fetching tables by status', status: 500 };
        }
    }

    @Post('reserve/:tableNumber/:userId')
    async reserveTable(@Param('tableNumber') tableNumber: number, @Param('userId') userId: string) {
        try {
            const reservedTable = await this.tableService.reserveTable(tableNumber, userId);
            return { message: 'Table reserved successfully', table: reservedTable };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { message: error.message, status: 404 };
            }
            return { message: 'Error reserving table', status: 500 };
        }
    }

    @Post('occupy/:tableNumber')
    async occupyTable(@Param('tableNumber') tableNumber: number) {
        try {
            const occupiedTable = await this.tableService.occupyTable(tableNumber);
            return { message: 'Table occupied successfully', table: occupiedTable };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { message: error.message, status: 404 };
            }
            return { message: 'Error occupied table', status: 500 };
        }
    }

    @Post('release/:tableNumber')
    async releaseTable(@Param('tableNumber') tableNumber: number) {
        try {
            const releasedTable = await this.tableService.releaseTable(tableNumber);
            return { message: 'Table released successfully', table: releasedTable };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { message: error.message, status: 404 };
            }
            return { message: 'Error releasing table', status: 500 };
        }
    }
}
