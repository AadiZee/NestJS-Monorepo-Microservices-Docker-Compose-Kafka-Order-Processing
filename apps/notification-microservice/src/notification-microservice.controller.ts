import { Controller, Get, Inject } from '@nestjs/common';
import { NotificationMicroserviceService } from './notification-microservice.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationMicroserviceController {
  constructor(
    private readonly notificationMicroserviceService: NotificationMicroserviceService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.notificationMicroserviceService.getHello();
  }

  @MessagePattern('order-created')
  sendOrderCreatedNotification(@Payload() order: any) {
    console.log(
      '[Notification-Service]: Sending Notification for new order: ',
      order,
    );
  }

  @MessagePattern('payment-succeed')
  sendPaymentSucceedNotification(@Payload() data: any) {
    console.log(
      '[Notification-Service]: Sending Notification for Order payment success: ',
      data,
    );
  }
}
