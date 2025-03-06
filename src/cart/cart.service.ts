import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from '../models/cart.model';
import { User } from '../models/user.model';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  async getCartItems(userId: number) {
    console.log('Getting cart items for userId:', userId);
    
    const cartItems = await this.cartModel.findAll({
      where: { userId },
      include: [{
        model: Ingredient,
        as: 'ingredient'
      }]
    });

    console.log('Raw cart items from database:', JSON.stringify(cartItems, null, 2));

    // If there are no items, return an empty array
    if (!cartItems || cartItems.length === 0) {
      console.log('No cart items found for userId:', userId);
      return [];
    }

    // Group items by pizza ID
    const pizzas = new Map<string, any>();
    
    for (const item of cartItems) {
      const pizzaId = item.getDataValue('pizzaId');
      console.log('Processing item with pizzaId:', pizzaId);
      
      if (!pizzas.has(pizzaId)) {
        pizzas.set(pizzaId, {
          pizzaId,
          crust: null,
          sauces: [],
          toppings: [],
          quantity: item.getDataValue('quantity'),
        });
      }

      const pizza = pizzas.get(pizzaId);
      const ingredient = item.getDataValue('ingredient');

      if (ingredient) {
        console.log('Processing ingredient:', ingredient.id, ingredient.name);
        if (ingredient.id <= 9) { // Crust
          pizza.crust = ingredient;
        } else if (ingredient.id <= 23) { // Sauce
          pizza.sauces.push(ingredient);
        } else { // Topping
          pizza.toppings.push(ingredient);
        }
      }
    }

    const result = Array.from(pizzas.values()).filter(pizza => pizza.crust !== null);
    console.log('Final processed pizzas:', JSON.stringify(result, null, 2));
    return result;
  }

  async addCartItem(userId: number, data: any) {
    const { crustId, sauceIds, toppingIds, quantity } = data;
    
    // Generate a unique pizzaId
    const pizzaId = `PIZZA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
      // Add crust
      await this.cartModel.create({
        userId,
        pizzaId,
        ingredientId: crustId,
        quantity,
      });

      // Add sauces
      for (const sauceId of sauceIds) {
        await this.cartModel.create({
          userId,
          pizzaId,
          ingredientId: sauceId,
          quantity,
        });
      }

      // Add toppings
      for (const toppingId of toppingIds) {
        await this.cartModel.create({
          userId,
          pizzaId,
          ingredientId: toppingId,
          quantity,
        });
      }

      return this.getCartItems(userId);
    } catch (error) {
      console.error('Error adding cart item:', error);
      throw error;
    }
  }

  async removeCartItem(userId: number, pizzaId: string) {
    await this.cartModel.destroy({
      where: {
        userId,
        pizzaId,
      }
    });
    return this.getCartItems(userId);
  }

  async updateCartItemQuantity(userId: number, pizzaId: string, quantity: number) {
    await this.cartModel.update(
      { quantity },
      {
        where: {
          userId,
          pizzaId,
        }
      }
    );
    return this.getCartItems(userId);
  }

  async clearCart(userId: number) {
    await this.cartModel.destroy({
      where: { userId }
    });
    return [];
  }
} 