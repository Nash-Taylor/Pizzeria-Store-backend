import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Order } from './order.model';

@Table({
  tableName: 'ingredients',
  timestamps: false
})
export class Ingredient extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  })
  name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  available: boolean;

  @HasMany(() => Cart)
  cart_items: Cart[];

  @HasMany(() => Order)
  orders: Order[];
} 