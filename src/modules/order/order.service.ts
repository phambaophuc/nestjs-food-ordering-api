import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './entities/order.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) { }

    async create(createOrderDto: CreateOrderDto) {
        const order = new this.orderModel(createOrderDto);

        const existingOrders: any = await this.cacheService.get(`order_${order.tableNumber}`);
        const expireTimeInMilliseconds = 3600 * 1000;

        if (existingOrders) {
            existingOrders.push(order);
            await this.cacheService.set(`order_${order.tableNumber}`, existingOrders, expireTimeInMilliseconds);
        } else {
            await this.cacheService.set(`order_${order.tableNumber}`, [order], expireTimeInMilliseconds);
        }

        const savedOrder = await order.save();
        return savedOrder;
    }

    async findAll(): Promise<OrderDocument[]> {
        return this.orderModel.find({ status: { $nin: ['completed', 'cancelled'] } })
            .sort({ createdAt: 'desc' }).exec();
    }

    async findAllOrderCompleted(): Promise<OrderDocument[]> {
        return this.orderModel.find({ status: 'completed' })
            .sort({ createdAt: 'desc' }).exec();
    }

    async findAllOrderCancelled(): Promise<OrderDocument[]> {
        return this.orderModel.find({ status: 'cancelled' })
            .sort({ createdAt: 'desc' }).exec();
    }

    async findById(id: string): Promise<OrderDocument> {
        return this.orderModel.findById(id).exec();
    }

    async findByTableNumber(tableNumber: number): Promise<OrderDocument[]> {
        return this.orderModel.find({ tableNumber: tableNumber }).exec();
    }

    async findAllInCache(tableNumber: number): Promise<OrderDocument[]> {
        const cached = await this.cacheService
            .get<OrderDocument[]>(`order_${tableNumber}`);
        return cached;
    }

    async changeStatus(id: string, status: string): Promise<OrderDocument> {
        const order = await this.orderModel.findById(id).exec();
        order.status = status;
        return this.orderModel.findByIdAndUpdate(id, order);
    }
}
