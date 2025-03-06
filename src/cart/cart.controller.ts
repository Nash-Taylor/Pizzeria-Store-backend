import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCartItems(@Request() req) {
    console.log('Cart controller - Request received');
    console.log('Cart controller - User data:', req.user);
    console.log('Cart controller - User ID:', req.user?.id);
    return this.cartService.getCartItems(req.user.id);
  }

  @Post()
  async addCartItem(@Request() req, @Body() data: any) {
    return this.cartService.addCartItem(req.user.id, data);
  }

  @Delete(':pizzaId')
  async removeCartItem(@Request() req, @Param('pizzaId') pizzaId: string) {
    return this.cartService.removeCartItem(req.user.id, pizzaId);
  }

  @Put(':pizzaId')
  async updateCartItemQuantity(
    @Request() req,
    @Param('pizzaId') pizzaId: string,
    @Body('quantity') quantity: number
  ) {
    return this.cartService.updateCartItemQuantity(req.user.id, pizzaId, quantity);
  }

  @Delete()
  async clearCart(@Request() req) {
    return this.cartService.clearCart(req.user.id);
  }
} 