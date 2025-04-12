import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flavor } from 'src/schemas/Flavor.schema';
import { CreateFlavorDto } from './dto/create-flavor.dto';
import { UpdateFlavorDto } from './dto/update-flavor.dto';

@Injectable()
export class FlavorsService {
  constructor(@InjectModel(Flavor.name) private flavorModel: Model<Flavor>) {}

  create(createFlavorDto: CreateFlavorDto) {
    const newProduct = new this.flavorModel(createFlavorDto);
    return newProduct.save();
  }

  findAll() {
    return this.flavorModel.find();
  }

  async findByIds(ids: string[]): Promise<Flavor[]> {
    return this.flavorModel.find({ _id: { $in: ids } }).exec();
  }

  findOne(id: string) {
    return this.flavorModel.findById(id);
  }

  update(id: string, updateFlavorDto: UpdateFlavorDto) {
    return this.flavorModel.findByIdAndUpdate(id, updateFlavorDto, { new: true });
  }

  remove(id: string) {
    return this.flavorModel.findByIdAndDelete(id);
  }
}
