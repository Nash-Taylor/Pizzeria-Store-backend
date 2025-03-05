import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from '../models/ingredient.model';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return this.ingredientModel.findAll({
      where: {
        available: true
      }
    });
  }

  async validateSelection(ingredientIds: number[]): Promise<{ 
    isValid: boolean; 
    totalPrice: number; 
    error?: string;
  }> {
    // Get all selected ingredients
    const selectedIngredients = await this.ingredientModel.findAll({
      where: {
        id: ingredientIds,
        available: true
      }
    });

    // Check if all ingredients exist and are available
    if (selectedIngredients.length !== ingredientIds.length) {
      return {
        isValid: false,
        totalPrice: 0,
        error: 'One or more selected ingredients are not available'
      };
    }

    // Minimum 4 ingredients required (1 crust + 1 sauce + 2 toppings)
    if (ingredientIds.length < 4) {
      return {
        isValid: false,
        totalPrice: 0,
        error: 'Please select at least 4 ingredients'
      };
    }

    // Calculate total price
    const totalPrice = selectedIngredients.reduce(
      (sum, ingredient) => sum + Number(ingredient.price),
      0
    );

    return {
      isValid: true,
      totalPrice
    };
  }
} 