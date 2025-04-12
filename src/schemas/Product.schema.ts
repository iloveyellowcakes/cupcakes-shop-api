import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Flavor } from './Flavor.schema';
import { OrderItem } from './OrderItem.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: false })
  imageUrl?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flavor' }] })
  flavors: Flavor[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' })
  products: OrderItem[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
