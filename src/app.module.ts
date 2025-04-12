import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FlavorsModule } from './flavors/flavors.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ValidateIdMiddleware } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.ljmhhyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ),
    UsersModule,
    ProductsModule,
    FlavorsModule,
    OrderItemsModule,
    OrderModule,
    AuthModule,
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
