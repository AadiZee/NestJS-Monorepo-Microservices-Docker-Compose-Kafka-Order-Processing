import { NestFactory } from '@nestjs/core';
import { OrderMicroserviceModule } from './order-microservice.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderMicroserviceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'order-consumer-group',
        },
      },
    },
  );
  await app.listen();

  Logger.log(`Order microservice is listening to kafka`);
}
bootstrap();
