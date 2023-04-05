import { BaseService } from '@/common/base.service';
import { MessageName } from '@/message';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<
  ProductEntity,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {
    super(MessageName.USER, productRepository);
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return await this.productRepository.save(createProductDto);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findbyCategory(id: number) {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.categoryId = :id', { id })
      .getMany();
  }
}
