import { Controller, Get, Inject } from '@nestjs/common';
import { OrderMicroserviceService } from './order-microservice.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderMicroserviceController {
  constructor(
    private readonly orderMicroserviceService: OrderMicroserviceService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.orderMicroserviceService.getHello();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Order-Service]: Received new order: ', order);
    this.kafkaClient.emit('process-payment', order);
    return { message: 'Order sent to payment', order };
  }
}
