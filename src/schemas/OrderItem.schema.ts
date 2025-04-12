import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Order } from './Order.schema';
import { Product } from './Product.schema';

@Schema()
export class OrderItem extends Document {
  @Prop({ required: true })
  product_quantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true })
  order: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  product: Product;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
