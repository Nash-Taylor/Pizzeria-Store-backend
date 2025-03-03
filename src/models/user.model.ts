import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Order } from './order.model';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 50]
    }
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password_hash: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [10, 20]
    }
  })
  phone: string;

  @Column(DataType.TEXT)
  address: string;

  @HasMany(() => Cart)
  cart_items: Cart[];

  @HasMany(() => Order)
  orders: Order[];
} 