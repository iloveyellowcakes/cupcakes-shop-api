import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Flavor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  // product: Product[];
}

export const FlavorSchema = SchemaFactory.createForClass(Flavor);
