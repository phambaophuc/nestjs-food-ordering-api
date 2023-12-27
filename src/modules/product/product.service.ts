import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }

    async create(createProductDto: CreateProductDto) {
        const product = new this.productModel(createProductDto);
        return await product.save();
    }

    async findAll(): Promise<ProductDocument[]> {
        const products = await this.productModel.find().exec();
        return products;
    }

    async findOne(id: string): Promise<ProductDocument> {
        const product = await this.productModel.findById(id);
        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const updatedData = await this.productModel
            .findByIdAndUpdate(id, updateProductDto, { new: true });
        return updatedData;
    }

    async remove(id: string) {
        return await this.productModel.findByIdAndDelete(id);
    }

    async findByName(keyword: string): Promise<ProductDocument[]> {
        const products = this.productModel.find({ name: { $regex: new RegExp(keyword, 'i') } }).exec();
        return products;
    }
}
