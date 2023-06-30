import { Module } from "@nestjs/common";
import { PaymentController } from "./controllers/payment.controller";
import { PaymentService } from "./services/payment.service";
import { PaypalProvider } from "./services/providers/paypal.provider";
import { PaymentProviderFactory } from "./services/payment-factory.service";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderEntity, OrderSchema } from "./entities/order.entity";
import { BrainTreeProvider } from "./services/providers/braintree.provider";

@Module({
  imports: [
    MongooseModule.forFeature([ { name: OrderEntity.name, schema: OrderSchema }])
  ],
  providers: [
    PaymentProviderFactory,
    PaypalProvider,
    BrainTreeProvider,
    PaymentService
  ],
  controllers: [PaymentController]
})

export class PaymentModule {}