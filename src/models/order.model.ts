import { Column, Model, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './user.model';
import { Ingredient } from './ingredient.model';

@Table({
  tableName: 'orders',
  timestamps: true,
  createdAt: 'order_date',
  updatedAt: false,
  indexes: [
    {
      unique: false,
      fields: ['userId', 'orderId']
    },
    {
      unique: false,
      fields: ['orderId', 'cartItemId']
    }
  ]
})
export class Order extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'userId'
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'orderId'
  })
  orderId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'cartItemId'
  })
  cartItemId: number;

  @ForeignKey(() => Ingredient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'ingredientId'
  })
  ingredientId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient;
} 