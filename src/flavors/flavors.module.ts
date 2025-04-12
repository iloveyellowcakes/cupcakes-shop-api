import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Flavor, FlavorSchema } from 'src/schemas/Flavor.schema';
import { Product, ProductSchema } from 'src/schemas/Product.schema';
import { FlavorsController } from './flavors.controller';
import { FlavorsService } from './flavors.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Flavor.name,
        schema: FlavorSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [FlavorsController],
  providers: [FlavorsService],
})
export class FlavorsModule {}
