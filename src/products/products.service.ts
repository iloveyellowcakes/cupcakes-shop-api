import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Flavor } from 'src/schemas/Flavor.schema';
import { Product } from 'src/schemas/Product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Flavor.name) private flavorModel: Model<Flavor>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { flavors } = createProductDto;

    const isValidFlavors = flavors.filter((flavor) => !mongoose.Types.ObjectId.isValid(flavor));

    if (isValidFlavors.length > 0) {
      throw new HttpException(`Flavors Ids: ${isValidFlavors.join(', ')} are invalid`, 400);
    }

    const existingFlavors = await this.flavorModel.find({ _id: { $in: flavors } });

    const nonExistingFlavors = flavors.filter(
      (flavor) => !existingFlavors.map((flavor) => flavor.id as string).includes(flavor)
    );

    if (existingFlavors.length === 0) {
      throw new HttpException(`Flavors are not found`, 404);
    }
    if (nonExistingFlavors.length > 0) {
      throw new HttpException(`Flavors: ${nonExistingFlavors.join(', ')} are not found`, 404);
    }

    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  findAll() {
    return this.productModel.find().populate('flavors');
  }

  findOne(id: string) {
    return this.productModel.findById(id).populate('flavors');
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { flavors } = updateProductDto;

    if (!flavors) {
      return this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .populate('flavors');
    }

    const isValidFlavors = flavors.filter((flavor) => !mongoose.Types.ObjectId.isValid(flavor));

    if (isValidFlavors.length > 0) {
      throw new HttpException(`Flavors Ids: ${isValidFlavors.join(', ')} are invalid`, 400);
    }

    const existingFlavors = await this.flavorModel.find({ _id: { $in: flavors } });

    const nonExistingFlavors = flavors.filter(
      (flavor) => !existingFlavors.map((flavor) => flavor.id as string).includes(flavor)
    );

    if (existingFlavors.length === 0) {
      throw new HttpException(`Flavors are not found`, 404);
    }

    if (nonExistingFlavors.length > 0) {
      throw new HttpException(`Flavors: ${nonExistingFlavors.join(', ')} are not found`, 404);
    }

    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .populate('flavors');
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
