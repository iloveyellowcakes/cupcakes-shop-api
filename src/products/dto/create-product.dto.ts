import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price should be number & max decimal is 2' })
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'stock should be number & max decimal is 2' })
  @IsNotEmpty()
  @Min(0)
  stock: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsArray()
  flavors: string[];
}
