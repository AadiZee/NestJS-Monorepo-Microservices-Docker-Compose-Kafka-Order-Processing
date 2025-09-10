import { Module } from '@nestjs/common';
import { NotificationMicroserviceController } from './notification-microservice.controller';
import { NotificationMicroserviceService } from './notification-microservice.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [NotificationMicroserviceController],
  providers: [NotificationMicroserviceService],
})
export class NotificationMicroserviceModule {}
