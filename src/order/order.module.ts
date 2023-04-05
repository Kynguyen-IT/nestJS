import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderDetailEntity } from '@/order-detail/entities/order-detail.entity';
import { OrderDetailService } from '@/order-detail/order-detail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderDetailEntity])],
  controllers: [OrderController],
  providers: [OrderService, OrderDetailService],
})
export class OrderModule {}
