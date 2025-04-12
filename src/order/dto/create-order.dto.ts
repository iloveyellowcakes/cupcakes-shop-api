import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @Type(() => CreateOrderItemDto)
  @ValidateNested()
  orderItems: CreateOrderItemDto[];
}
