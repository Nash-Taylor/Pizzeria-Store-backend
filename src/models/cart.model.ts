import { Column, Model, Table, ForeignKey, BelongsTo, DataType, Index } from 'sequelize-typescript';
import { User } from './user.model';
import { Ingredient } from './ingredient.model';

@Table({
  tableName: 'cart',
  timestamps: false,
  indexes: [
    {
      unique: false,
      fields: ['userId', 'pizzaId']
    }
  ]
})
export class Cart extends Model {
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
    field: 'pizzaId'
  })
  pizzaId: string;

  @ForeignKey(() => Ingredient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'ingredientId'
  })
  ingredientId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    field: 'quantity'
  })
  quantity: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Ingredient)
  ingredient: Ingredient;
} 