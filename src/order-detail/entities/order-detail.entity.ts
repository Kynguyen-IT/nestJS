import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '@/product/entities/product.entity';
import { OrderEntity } from '@/order/entities/order.entity';

@Entity('order-detail')
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderDetail)
  product: ProductEntity;
}
