import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  async getCartItems(@Param('userId') userId: number) {
    return this.cartService.findByUserId(userId);
  }

  @Post()
  async addToCart(
    @Body()
    cartData: {
      userId: number;
      pizzaDetails: {
        size: string;
        ingredients: number[];
        quantity: number;
        totalPrice: number;
      };
    },
  ) {
    return this.cartService.addToCart(cartData);
  }

  @Delete(':id')
  async removeFromCart(@Param('id') id: number) {
    return this.cartService.removeFromCart(id);
  }
} 