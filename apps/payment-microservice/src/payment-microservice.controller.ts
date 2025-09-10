import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentMicroserviceService } from './payment-microservice.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentMicroserviceController {
  constructor(
    private readonly paymentMicroserviceService: PaymentMicroserviceService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.paymentMicroserviceService.getHello();
  }

  @MessagePattern('process-payment')
  processPayment(@Payload() data: any) {
    console.log('[Payment-Service]: Received new payment request: ', data);
    this.kafkaClient.emit('payment-succeed', data);
    // return { message: 'Order sent to payment', order };
  }
}
