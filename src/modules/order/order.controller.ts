import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { SocketGateway } from 'src/socket/socket.gateway';

@Controller('order')
@ApiTags('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService,
        private socketGateway: SocketGateway
    ) { }

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        const newOrder = await this.orderService.create(createOrderDto);
        this.socketGateway.sendNewOrder(newOrder);
        return newOrder;
    }

    @Get()
    async findAll() {
        return this.orderService.findAll();
    }

    @Put('/:id/change-status')
    async changeStatus(@Param('id') id: string, @Query('status') status: string) {
        try {
            await this.orderService.changeStatus(id, status);

            const updatedOrder = await this.orderService.findById(id);
            this.socketGateway.sendOrderStatusUpdate(updatedOrder);

            return { message: `Đã thay đổi trạng thái thành ${status}.` };
        } catch (error) {
            return { message: 'Có lỗi xảy ra', error: error.message };
        }
    }
}
