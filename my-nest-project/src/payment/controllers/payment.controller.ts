import { Controller, Post, Body } from "@nestjs/common";
import { OrderDto } from "../dtos/order.dto";
import { PaymentService } from "../services/payment.service";

@Controller({ path: 'payment' })
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  @Post()
  createOrder(@Body() body: OrderDto) {
    return this.paymentService.createPayment(body);
  }
}