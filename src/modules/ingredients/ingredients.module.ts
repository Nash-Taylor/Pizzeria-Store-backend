import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredient } from '../../entities/ingredient.entity';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';

@Module({
  imports: [SequelizeModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {} 