import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';
import { Ingredient } from '../models/ingredient.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, User, Ingredient])
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {} 