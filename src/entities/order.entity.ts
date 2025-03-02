import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.entity';

@Table
export class Order extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column('jsonb')
  items: {
    size: string;
    ingredients: number[];
    quantity: number;
    price: number;
  }[];

  @Column
  totalAmount: number;

  @Column({ defaultValue: 'pending' })
  status: 'pending' | 'processing' | 'completed' | 'cancelled';

  @Column
  deliveryAddress: string;
} 