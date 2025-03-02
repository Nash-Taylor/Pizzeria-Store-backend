import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ingredient } from '../../entities/ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient)
    private ingredientModel: typeof Ingredient,
  ) {}

  async findAll() {
    return this.ingredientModel.findAll({
      where: { isAvailable: true },
    });
  }
} 