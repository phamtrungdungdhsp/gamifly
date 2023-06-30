import { ICard } from "src/payment/interfaces/card.interface";
import { IPaymentProvider } from "../payment-factory.service";
import { IOrder } from "src/payment/interfaces/order.interface";
import { BraintreeGateway, Environment } from "braintree";
import { BadGatewayException, Injectable } from "@nestjs/common";

@Injectable()
export class BrainTreeProvider implements IPaymentProvider {
  private gateway: BraintreeGateway;
  constructor() {
    this.gateway = new BraintreeGateway({
      environment: Environment.Sandbox,
      merchantId: process.env.BRAINTREE_MERCHANT_ID,
      publicKey: process.env.BRANTREE_PUBLIC_KEY,
      privateKey: process.env.BRAINTREE_SECRET_KEY
    });
  }
  async oneTimePaymentCreditCard(payload: IOrder, card: ICard): Promise<{ orderId: string; status: string; }> {
    const result = await this.gateway.transaction.sale({
      amount: payload.amount.toString(),
      creditCard: {
        number: card.number,
        cardholderName: card.name,
        expirationMonth: card.expirationMonth,
        expirationYear: card.expirationYear,
        cvv: card.cvv
      } })
    if (!result.success) {
      throw new BadGatewayException('Create order fail')
    }
    return { orderId: result.transaction.id, status: 'COMPLETED' }
  } 
  captureOrder(orderId: string, card: ICard): Promise<{ orderId: string; status: string; }> {
    throw new Error("Method not implemented.");
  }
}