import { Controller, Get, Post, Body, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { SocketGateway } from 'src/socket/socket.gateway';
import { OrderStatusDto } from './dto/order-status.dto';

@Controller('orders')
@ApiTags('orders')
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

    @Get('/table/:number')
    async findByTableNumber(@Param('number') tableNumber: number) {
        return this.orderService.findByTableNumber(tableNumber);
    }

    @Put('/:id/change-status')
    async changeStatus(@Param('id') id: string, @Body() status: OrderStatusDto) {
        try {
            await this.orderService.changeStatus(id, status.status);

            const updatedOrder = await this.orderService.findById(id);
            this.socketGateway.sendOrderStatusUpdate(updatedOrder);

            return { message: `Thay đổi status thành công.` };
        } catch (error) {
            throw new HttpException({ message: 'Có lỗi xảy ra', error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
