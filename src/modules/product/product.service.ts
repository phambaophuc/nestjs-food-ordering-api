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
        return product.save();
    }

    async findAll(): Promise<ProductDocument[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<ProductDocument> {
        return this.productModel.findById(id);
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
