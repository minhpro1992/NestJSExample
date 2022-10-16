import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>,
  ) {}
  createUser(body: CreateUserDto) {
    return this.usersRepo.save(body);
  }
  async findUserById(id: number) {
    const user = await this.usersRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async findUserByEmail(email: string) {
    const users = await this.usersRepo.find({
      where: {
        email,
      },
    });
    return users;
  }
  async updateUser(id: number, attrs: Partial<UsersEntity>) {
    const user = await this.usersRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, attrs);
    return this.usersRepo.save(user);
  }
  async deleteUser(id: number) {
    const user = await this.usersRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepo.remove(user);
  }
  async findAllUsers() {
    const users = await this.usersRepo.find();
    return users;
  }
}
