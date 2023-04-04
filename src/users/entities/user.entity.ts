import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { OrderEntity } from '@/order/entities/order.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  resetCode: string;

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
