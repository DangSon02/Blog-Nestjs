import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<any> {
    return await this.authService.register(registerUserDto);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginUserDTO: LoginUserDTO): Promise<any> {
    return await this.authService.login(loginUserDTO);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body): Promise<any> {
    return await this.authService.refreshToken(body.refreshToken);
  }
}
