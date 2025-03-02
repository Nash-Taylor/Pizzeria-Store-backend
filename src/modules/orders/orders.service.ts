import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../../entities/order.entity';
import { Cart } from '../../entities/cart.entity';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(Cart)
    private cartModel: typeof Cart,
    private sequelize: Sequelize,
  ) {}

  async findByUserId(userId: number) {
    return this.orderModel.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }

  async createOrder(orderData: { userId: number; deliveryAddress: string }) {
    const t: Transaction = await this.sequelize.transaction();

    try {
      const cartItems = await this.cartModel.findAll({
        where: { userId: orderData.userId },
        transaction: t,
      });

      if (cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      const items = cartItems.map((item) => item.pizzaDetails);
      const totalAmount = items.reduce(
        (sum, item) => sum + item.totalPrice * item.quantity,
        0,
      );

      const order = await this.orderModel.create(
        {
          userId: orderData.userId,
          items,
          totalAmount,
          deliveryAddress: orderData.deliveryAddress,
        },
        { transaction: t },
      );

      // Clear the cart
      await this.cartModel.destroy({
        where: { userId: orderData.userId },
        transaction: t,
      });

      await t.commit();
      return order;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
} 