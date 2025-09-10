import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }

  @Post('order')
  createOrder(@Body() order: any) {
    console.log('Received new order, sending to kafka => ', order);
    this.kafkaClient.emit('order-created', order);
    return { message: 'Order sent to kafka', order };
  }
}
