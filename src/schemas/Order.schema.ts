import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderStatus } from 'src/utils/enums/order-status.enum';
import { OrderItem } from './OrderItem.schema';

@Schema()
export class Order extends Document {
  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.CREATED })
  status: OrderStatus;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }], required: true })
  orderItems: OrderItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
