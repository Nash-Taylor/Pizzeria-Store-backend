import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';

@Table
export class Cart extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column('jsonb')
  pizzaDetails: {
    size: string;
    ingredients: number[];
    quantity: number;
    totalPrice: number;
  };
} 