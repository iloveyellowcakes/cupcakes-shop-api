import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) throw new HttpException('Product not found', 404);
    return product;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productsService.update(id, updateProductDto);
    if (!updatedProduct) throw new HttpException('Product not found', 404);
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedProduct = await this.productsService.remove(id);
    if (!deletedProduct) throw new HttpException('Product not found', 404);
    return deletedProduct;
  }
}
