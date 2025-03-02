import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { User } from './entities/user.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...databaseConfig,
      models: [User, Ingredient, Cart, Order],
    }),
    AuthModule,
    UsersModule,
    IngredientsModule,
    CartModule,
    OrdersModule,
  ],
})
export class AppModule {}
