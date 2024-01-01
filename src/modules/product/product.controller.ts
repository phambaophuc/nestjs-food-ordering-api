import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get('search')
    async findByName(@Query('keyword') keyword: string) {
        return this.productService.findByName(keyword);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.productService.findById(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        try {
            const updatedProduct = await this.productService.update(id, updateProductDto);
            return { message: 'Product Updated Successfully!', updatedProduct };
        } catch (error) {
            return { message: 'Có lỗi xảy ra', error: error.message };
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}
