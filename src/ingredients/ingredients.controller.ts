import { Controller, Get, Post, Body } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Ingredient } from '../models/ingredient.model';

class ValidateSelectionDto {
  ingredientIds: number[];
}

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return this.ingredientsService.findAll();
  }

  @Post('validate')
  async validateSelection(@Body() validateSelectionDto: ValidateSelectionDto) {
    return this.ingredientsService.validateSelection(validateSelectionDto.ingredientIds);
  }
} 