import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUsersDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
