import { UserEntity } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
  async create(user: UserEntity, createOrderDto: CreateOrderDto) {
    return await this.orderRepository.save({ user, ...createOrderDto });
  }

  async findAll(id: number) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.orderDetails', 'orderDetails')
      .innerJoinAndSelect('orderDetails.product', 'product')
      .where('order.userId = :userId', { userId: id })
      .getMany();
  }

  async findOne(id: number) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .innerJoinAndSelect('order.orderDetails', 'orderDetails')
      .innerJoinAndSelect('orderDetails.product', 'product')
      .where('order.id = :id', { id })
      .getOne();
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
