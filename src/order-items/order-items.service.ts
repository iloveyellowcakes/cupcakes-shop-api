import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem } from 'src/schemas/OrderItem.schema';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(@InjectModel(OrderItem.name) private orderModel: Model<OrderItem>) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const newOrderItem = new this.orderModel(createOrderItemDto);

    return await newOrderItem.save();
  }

  findAll() {
    return this.orderModel.find().populate('product');
  }

  findOne(id: string) {
    return this.orderModel.findById(id).populate('product');
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderModel
      .findByIdAndUpdate(id, updateOrderItemDto, { new: true })
      .populate('product');
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
