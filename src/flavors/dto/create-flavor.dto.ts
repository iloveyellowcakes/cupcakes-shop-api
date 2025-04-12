import { IsOptional, IsString } from 'class-validator';

export class CreateFlavorDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
