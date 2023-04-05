import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { OrderDetailEntity } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
  ) {}

  async create(orderDetails: CreateOrderDetailDto[]) {
    return await this.orderDetailRepository.save(orderDetails);
  }

  findAll() {
    return `This action returns all orderDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  // update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
  //   return `This action updates a #${id} orderDetail`;
  // }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
