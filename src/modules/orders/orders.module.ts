import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from '../../entities/order.entity';
import { Cart } from '../../entities/cart.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, Cart])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {} 