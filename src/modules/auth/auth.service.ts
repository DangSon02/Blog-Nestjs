import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashPassword = await this.hashPassword(registerUserDto.password);

    return await this.userRepository.save({
      ...registerUserDto,
      password: hashPassword,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10);

    return hashPassword;
  }

  async login(loginUserDTO: LoginUserDTO): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDTO.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email is not exist!');
    }

    const checkPassword = await bcrypt.compare(
      loginUserDTO.password,
      user.password,
    );

    if (!checkPassword) {
      throw new UnauthorizedException('Password is not correct!');
    }

    const payload = { id: user.id, email: user.email };

    const JWT = await this.createTokenPair(payload);

    return {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      JWT,
    };
  }

  async createTokenPair(payload: { id: number; email: string }): Promise<any> {
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('SECRET'),
      expiresIn: '1d',
    });

    await this.userRepository.update(
      { email: payload.email },
      { refreshToken: refreshToken },
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    /**
     * 1. verify cai refeshToken ra
     * 2. check cai email va cai refreshToken trong db
     * 3. neu dung thi cho taoj mot accesstoken moi
     *
     */

    try {
      const verifyToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('SECRET'),
      });

      const isRefrehToken = await this.userRepository.findOneBy({
        email: verifyToken.email,
        refreshToken,
      });

      if (isRefrehToken) {
        return await this.createTokenPair({
          id: verifyToken.id,
          email: verifyToken.email,
        });
      } else {
        throw new BadRequestException('Refreh Token is not valid');
      }
    } catch (error) {
      throw new BadRequestException('Refreh Token is not valid');
    }
  }
}
