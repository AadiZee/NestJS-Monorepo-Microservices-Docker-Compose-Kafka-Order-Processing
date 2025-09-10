import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationMicroserviceService {
  getHello(): string {
    return 'Hello World!';
  }
}
