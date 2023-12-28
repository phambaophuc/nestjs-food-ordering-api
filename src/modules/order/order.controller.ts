import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('order')
export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return await this.orderService.create(createOrderDto);
    }

    @Get()
    async findAll() {
        return await this.orderService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.orderService.findById(id);
    }

    @Get('/customer/:customerId')
    async findByCustomer(@Param('customerId') customerId: string) {
        return await this.orderService.findByCustomer(customerId);
    }
}
