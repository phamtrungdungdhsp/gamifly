import { ICard } from "src/payment/interfaces/card.interface";
import { PaypalProvider } from "./providers/paypal.provider";
import { Injectable } from "@nestjs/common";
import { IOrder } from "../interfaces/order.interface";
import { BrainTreeProvider } from "./providers/braintree.provider";
import { PaymentProviderType } from "../types/payment.type";

export interface IPaymentProvider {
  oneTimePaymentCreditCard(payload: IOrder, card: ICard): Promise<{ orderId: string, status: string }>;
}

@Injectable()
export class PaymentProviderFactory {
  constructor(
    private paypalProvider: PaypalProvider,
    private brainTreeProvider: BrainTreeProvider
  ) {}
  getProvider(method: PaymentProviderType): IPaymentProvider {
    if (method === 'braintree') {
      return this.brainTreeProvider;
    }
    return this.paypalProvider;
  }
}