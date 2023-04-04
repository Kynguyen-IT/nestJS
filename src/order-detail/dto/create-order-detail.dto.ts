
import { OrderEntity } from "@/order/entities/order.entity";
import { ProductEntity } from "@/product/entities/product.entity";
import { IsNotEmpty, IsNumber, IsObject } from "class-validator";

export class CreateOrderDetailDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsObject()
  order: OrderEntity;

  @IsNotEmpty()
  @IsObject()
  product: ProductEntity;
}
