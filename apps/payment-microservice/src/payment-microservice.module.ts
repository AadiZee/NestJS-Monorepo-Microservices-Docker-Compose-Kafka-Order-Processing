import { Module } from '@nestjs/common';
import { PaymentMicroserviceController } from './payment-microservice.controller';
import { PaymentMicroserviceService } from './payment-microservice.service';
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
  controllers: [PaymentMicroserviceController],
  providers: [PaymentMicroserviceService],
})
export class PaymentMicroserviceModule {}
