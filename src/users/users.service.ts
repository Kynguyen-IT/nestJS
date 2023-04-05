import { BaseService, RemoveResult } from '@/common/base.service';
import { MessageName } from '@/message';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<
  UserEntity,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(MessageName.USER, userRepository);
  }

  repositoryService() {
    return this.userRepository;
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const toUpdate = await this.userRepository.findOne({
      where: { id } as any,
    });
    const updated = Object.assign(toUpdate, updateUserDto);
    return this.userRepository.save(updated);
  }

  async remove(id: number): Promise<RemoveResult> {
    const removed = await this.userRepository.delete(id);
    return {
      removed: removed.affected,
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }
}
