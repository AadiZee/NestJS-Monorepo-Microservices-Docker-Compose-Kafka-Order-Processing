import { NestFactory } from '@nestjs/core';
import { PaymentMicroserviceModule } from './payment-microservice.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentMicroserviceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'payment-consumer-group',
        },
      },
    },
  );
  await app.listen();
  Logger.log(`Payment microservice is listening to kafka`);
}
bootstrap();
