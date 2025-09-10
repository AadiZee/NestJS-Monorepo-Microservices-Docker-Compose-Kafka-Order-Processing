import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
