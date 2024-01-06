import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) { }

    async create(createProductDto: CreateProductDto) {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async findAll(): Promise<ProductDocument[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<ProductDocument> {
        const dataCached = await this.cacheService.get<ProductDocument>(id);
        if (dataCached) {
            return dataCached;
        }
        const product = await this.productModel.findById(id).exec();
        this.cacheService.set(id, product, 50000); // 10000 = 10s

        return product;
    }

    async findByType(type: string): Promise<ProductDocument[]> {
        return this.productModel.find({ type: type }).exec();
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        return this.productModel
            .findByIdAndUpdate(id, updateProductDto, { new: true });
    }

    async remove(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }

    async findByName(keyword: string): Promise<ProductDocument[]> {
        return this.productModel
            .find({ name: { $regex: new RegExp(keyword, 'i') } })
            .exec();
    }
}
