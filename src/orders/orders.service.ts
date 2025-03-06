import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  async getOrders(userId: number) {
    try {
      console.log('Getting orders for userId:', userId);
      
      const orders = await this.orderModel.findAll({
        where: { userId },
        include: [{
          model: Ingredient,
          as: 'ingredient'
        }],
        order: [['order_date', 'DESC']]
      });

      // If there are no orders, return an empty array
      if (!orders || orders.length === 0) {
        return [];
      }

      // Group orders by orderId
      const groupedOrders = new Map<string, any>();
      
      for (const order of orders) {
        const orderData = order.get();
        const orderId = orderData.orderId;
        
        if (!groupedOrders.has(orderId)) {
          groupedOrders.set(orderId, {
            orderId,
            orderDate: orderData.order_date || orderData.createdAt || new Date().toISOString(),
            pizzas: []
          });
        }

        const orderGroup = groupedOrders.get(orderId);
        const ingredient = orderData.ingredient;
        const cartItemId = orderData.cartItemId;

        // Find or create pizza in the order
        let pizza = orderGroup.pizzas.find(p => p.cartItemId === cartItemId);
        if (!pizza) {
          pizza = {
            cartItemId,
            crust: null,
            sauces: [],
            toppings: []
          };
          orderGroup.pizzas.push(pizza);
        }

        if (ingredient) {
          if (ingredient.id <= 9) { // Crust
            pizza.crust = ingredient;
          } else if (ingredient.id <= 23) { // Sauce
            pizza.sauces.push(ingredient);
          } else { // Topping
            pizza.toppings.push(ingredient);
          }
        }
      }

      return Array.from(groupedOrders.values());
    } catch (error) {
      console.error('Error in getOrders:', error);
      throw error;
    }
  }

  async createOrder(userId: number, data: any) {
    try {
      const { orderId, cartItemId, ingredientId } = data;
      console.log('Order service - Creating order with data:', { userId, orderId, cartItemId, ingredientId });

      // Validate required fields
      if (!userId) {
        throw new Error('User ID is required');
      }
      if (!orderId) {
        throw new Error('Order ID is required');
      }
      if (cartItemId === undefined || cartItemId === null) {
        throw new Error('Cart Item ID is required');
      }
      if (!ingredientId) {
        throw new Error('Ingredient ID is required');
      }

      // Check if user exists
      const user = await this.userModel.findByPk(userId);
      if (!user) {
        throw new Error(`User not found with ID: ${userId}`);
      }
      console.log('Order service - User found:', user.id);

      // Check if ingredient exists
      const ingredient = await this.ingredientModel.findByPk(ingredientId);
      if (!ingredient) {
        throw new Error(`Ingredient not found with ID: ${ingredientId}`);
      }
      console.log('Order service - Ingredient found:', ingredient.id);

      // Create order
      const order = await this.orderModel.create({
        userId,
        orderId,
        cartItemId,
        ingredientId
      });
      console.log('Order service - Order created:', order.id);

      // Fetch the created order with associations
      const createdOrder = await this.orderModel.findByPk(order.id, {
        include: [
          {
            model: this.userModel,
            as: 'user'
          },
          {
            model: this.ingredientModel,
            as: 'ingredient'
          }
        ]
      });

      if (!createdOrder) {
        throw new Error('Failed to fetch created order with associations');
      }

      console.log('Order service - Created order with associations:', createdOrder.id);

      return createdOrder;
    } catch (error) {
      console.error('Order service - Error creating order:', error);
      throw error;
    }
  }
} 