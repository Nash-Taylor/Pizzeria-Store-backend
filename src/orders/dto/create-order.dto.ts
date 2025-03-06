import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  orderId: string;

  @IsNumber()
  cartItemId: number;

  @IsNumber()
  ingredientId: number;
} 