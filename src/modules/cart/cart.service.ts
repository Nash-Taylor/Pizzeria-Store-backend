import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from '../../entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
  ) {}

  async findByUserId(userId: number) {
    return this.cartModel.findAll({
      where: { userId },
    });
  }

  async addToCart(cartData: {
    userId: number;
    pizzaDetails: {
      size: string;
      ingredients: number[];
      quantity: number;
      totalPrice: number;
    };
  }) {
    return this.cartModel.create(cartData);
  }

  async removeFromCart(id: number) {
    const cart = await this.cartModel.findByPk(id);
    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }
    await cart.destroy();
    return { message: 'Cart item removed successfully' };
  }
} 