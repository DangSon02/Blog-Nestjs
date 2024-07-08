import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';

import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('get-all-user')
  async findAllUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @UseGuards(AuthGuard)
  @Get('get-one-user/:id')
  async findOneUser(@Param('id') id: number): Promise<User> {
    return this.userService.findOneUser(id);
  }

  @Patch('update-user/:id')
  async updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
