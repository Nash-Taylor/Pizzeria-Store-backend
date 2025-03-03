import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { User } from './models/user.model';
import { Ingredient } from './models/ingredient.model';
import { Cart } from './models/cart.model';
import { Order } from './models/order.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [User, Ingredient, Cart, Order],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 