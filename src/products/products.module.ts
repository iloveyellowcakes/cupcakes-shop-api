import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Flavor, FlavorSchema } from 'src/schemas/Flavor.schema';
import { Product, ProductSchema } from 'src/schemas/Product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Flavor.name,
        schema: FlavorSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
