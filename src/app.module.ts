import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FlavorsModule } from './flavors/flavors.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ValidateIdMiddleware } from './utils';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.ljmhhyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ),
    UsersModule,
    ProductsModule,
    FlavorsModule,
    OrderItemsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIdMiddleware)
      .forRoutes('products/:id', 'flavors/:id', 'users/:id', 'orders/:id');
  }
}
