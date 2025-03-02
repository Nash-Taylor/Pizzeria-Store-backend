import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':userId')
  async getOrders(@Param('userId') userId: number) {
    return this.ordersService.findByUserId(userId);
  }

  @Post()
  async placeOrder(
    @Body()
    orderData: {
      userId: number;
      deliveryAddress: string;
    },
  ) {
    return this.ordersService.createOrder(orderData);
  }
} 