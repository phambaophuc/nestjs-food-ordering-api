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
        return this.orderModel.find().exec();
    }

    async findById(id: string): Promise<OrderDocument> {
        return this.orderModel.findById(id).exec();
    }

    async findByCustomer(customer: string) {
        return await this.orderModel.find({ 'customer': customer }).exec();
    }
}
