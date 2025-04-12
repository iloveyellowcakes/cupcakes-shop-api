import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be number & max decimal precission 2' }
  )
  @IsNumber({}, { message: 'Quantity should be number' })
  @IsPositive({ message: 'Quantity can not be Negative.' })
  product_quantity: number;
}
