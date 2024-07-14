import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllUser(query: PaginationDTO): Promise<any> {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const skip = (page - 1) * limit;
    const keySearch = query.search;

    const [res, total] = await this.userRepository.findAndCount({
      where: [
        { firstName: Like('%' + keySearch + '%') },
        { lastName: Like('%' + keySearch + '%') },
      ],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
      select: ['id', 'firstName', 'lastName', 'email', 'status', 'createdAt'],
    });

    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return { res, total, currentPage: page, nextPage, prevPage, lastPage };
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
