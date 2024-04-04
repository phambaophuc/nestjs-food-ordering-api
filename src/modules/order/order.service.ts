import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './entities/order.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TableService } from '../table/table.service';
import { ProductService } from '../product/product.service';
import { OrderStatus } from '../enums/order-status.enum';

@Injectable()
export class OrderService {

    constructor(
        @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
        private readonly tableService: TableService,
        private readonly productService: ProductService
    ) { }

    async create(createOrderDto: CreateOrderDto) {
        const order = new this.orderModel(createOrderDto);
        return order.save();
    }

    async findAll(): Promise<any[]> {
        const orders = await this.orderModel.find().sort({ createdAt: 'desc' }).exec();
        return orders;
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

    async findByTableNumber(tableNumber: number): Promise<any[]> {
        const table = await this.tableService.findByNumber(tableNumber);
        const orders = await this.orderModel.find({
            tableNumber,
            createdAt: { $gt: table.updatedAt }
        }).exec();

        const ordersWithProductInfo = await Promise.all(
            orders.map(async (order) => {
                const itemsWithProductInfo = await this.processItems(order.items);
                return { ...order.toObject(), items: itemsWithProductInfo };
            })
        );
        return ordersWithProductInfo;
    }

    private async processItems(items: { productId: string, quantity: number }[]): Promise<{ productInfo: any, quantity: number }[]> {
        return Promise.all(items.map(async (item) => {
            const productInfo = await this.getProductInfo(item.productId);
            return { productInfo, quantity: item.quantity };
        }));
    }

    private async getProductInfo(productId: string): Promise<any> {
        return this.productService.findById(productId);
    }

    async changeStatus(id: string, status: OrderStatus): Promise<OrderDocument> {
        const updatedOrder = await this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
        if (!updatedOrder) {
            throw new NotFoundException('Đơn hàng không tồn tại');
        }
        return updatedOrder;
    }

    async deleteById(id: string) {
        const order = await this.orderModel.findById(id);
        if (!order) {
            throw new NotFoundException('Đơn hàng không tồn tại');
        }
        return this.orderModel.findByIdAndDelete(id);
    }
}
