import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
