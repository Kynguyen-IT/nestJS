import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '@decorators/auth.decotator';
import { User } from '@decorators/user.decotator';
import { OrderDetailService } from '@/order-detail/order-detail.service';
import { UserEntity } from '@/users/entities/user.entity';

@ApiBearerAuth()
@ApiTags('orders')
@Controller('orders')
@Auth()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly orderDetailService: OrderDetailService,
  ) {}

  @Post()
  async create(
    @User() user: UserEntity,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const order = await this.orderService.create(user, createOrderDto);
    const orderDetaildata = createOrderDto?.products.map((item) => {
      const data = {
        order,
        quantity: item.quantity,
        total: item.quantity * item.price,
        product: item,
      };
      return data;
    });
    await this.orderDetailService.create(orderDetaildata);
    return order;
  }

  @Get()
  findAll(@User('id') id: number) {
    return this.orderService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
