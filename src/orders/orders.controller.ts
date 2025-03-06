import { Controller, Post, Body, UseGuards, Get, Request, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    try {
      if (!req.user?.id) {
        throw new HttpException('User ID not found in request', HttpStatus.UNAUTHORIZED);
      }

      console.log('Order controller - Creating order with data:', createOrderDto);
      const result = await this.orderService.createOrder(req.user.id, createOrderDto);
      console.log('Order controller - Order created successfully:', result);
      return result;
    } catch (error) {
      console.error('Order controller - Error creating order:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async getOrders(@Request() req) {
    try {
      console.log('Order controller - Get orders request received');
      console.log('Order controller - User data:', req.user);
      console.log('Order controller - User ID:', req.user?.id);
      
      if (!req.user?.id) {
        throw new HttpException('User ID not found in request', HttpStatus.UNAUTHORIZED);
      }

      const result = await this.orderService.getOrders(req.user.id);
      console.log('Order controller - Orders retrieved successfully:', result);
      return result;
    } catch (error) {
      console.error('Order controller - Error getting orders:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        error.message || 'Failed to get orders',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 