import { NestFactory } from '@nestjs/core';
import { NotificationMicroserviceModule } from './notification-microservice.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationMicroserviceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'notification-consumer-group',
        },
      },
    },
  );
  await app.listen();

  Logger.log(`Notification microservice is listening to kafka`);
}
bootstrap();
