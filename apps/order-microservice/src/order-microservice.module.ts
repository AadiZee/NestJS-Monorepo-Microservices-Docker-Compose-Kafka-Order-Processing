import { Module } from '@nestjs/common';
import { OrderMicroserviceController } from './order-microservice.controller';
import { OrderMicroserviceService } from './order-microservice.service';
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
  controllers: [OrderMicroserviceController],
  providers: [OrderMicroserviceService],
})
export class OrderMicroserviceModule {}
