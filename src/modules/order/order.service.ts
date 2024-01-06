import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {

    constructor(@InjectModel('Order') private readonly orderModel: Model<OrderDocument>) { }

    async create(createOrderDto: CreateOrderDto) {
        const order = new this.orderModel(createOrderDto);
        return order.save();
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

    async changeStatus(id: string, status: string): Promise<OrderDocument> {
        const order = await this.orderModel.findById(id).exec();
        order.status = status;
        return this.orderModel.findByIdAndUpdate(id, order);
    }
}
