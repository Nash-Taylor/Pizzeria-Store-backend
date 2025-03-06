import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from '../models/cart.model';
import { User } from '../models/user.model';
import { Ingredient } from '../models/ingredient.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, User, Ingredient])
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {} 