import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';
import { Order } from 'src/schemas/Order.schema';
import { OrderItem } from 'src/schemas/OrderItem.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = new this.orderModel(createOrderDto);
    order.orderItems = [];

    const newOrderWithoutItems = await order.save();

    let orderItems: CreateOrderItemDto[] = [];

    if (createOrderDto.orderItems && createOrderDto.orderItems.length > 0) {
      orderItems = createOrderDto.orderItems.map((item) => ({
        ...item,
        order: newOrderWithoutItems.id as string,
      }));
    }
    const newOrderItems = await this.orderItemModel.insertMany(orderItems);

    const newOrderWithItems = new this.orderModel({
      ...createOrderDto,
      orderItems: newOrderItems.map((orderItem) => orderItem.id as string),
    });

    return newOrderWithItems.save();
  }

  findAll() {
    return this.orderModel.find();
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true });
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
}
