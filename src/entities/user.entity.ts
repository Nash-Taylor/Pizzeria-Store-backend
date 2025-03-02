import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @HasMany(() => Cart)
  cart: Cart[];

  @HasMany(() => Order)
  orders: Order[];
} 