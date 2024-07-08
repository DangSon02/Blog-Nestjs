import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllUser(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'status', 'createdAt'],
    });
  }

  async findOneUser(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async updateUser(userId: number, updateUserDTO: UpdateUserDto) {
    return this.userRepository.update({ id: userId }, updateUserDTO);
  }

  async deleteUser(userId: number) {
    return this.userRepository.delete({ id: userId });
  }
}
