import { CategoryEntity } from '@/category/entities/category.entity';
import { OrderDetailEntity } from '@/order-detail/entities/order-detail.entity';
import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;

  @IsOptional()
  quantity: number

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category: number;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetailEntity[];
}
