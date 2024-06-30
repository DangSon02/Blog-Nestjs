import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World Dang Van Son, He is a Software Engineer!';
  }
}
