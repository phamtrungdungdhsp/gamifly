import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderDto } from "../dtos/order.dto";
import { PaymentProviderFactory } from "./payment-factory.service";
import { OrderEntity } from "../entities/order.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Currency, PaymentProviderType } from "../types/payment.type";
import { CARD_REGEX } from "../constants/card.constant";

@Injectable()
export class PaymentService {
  constructor(
    private paymentProviderFactory: PaymentProviderFactory,
    @InjectModel(OrderEntity.name) private orderModel: Model<OrderEntity>
  ) {}

  async createPayment(body: OrderDto) {
    try {
      const provider = this.paymentProviderFactory.getProvider(this.selectProvider(body.cardNumber, body.currency));
      const [month, year] = body.expiryDate.split('/')
      const order = await provider.oneTimePaymentCreditCard({ amount: body.price.toString(), currency: body.currency, customId: body.referencedId} ,
        {
          name: body.cardHolderName,
          number: body.cardNumber,
          expirationMonth: month,
          expirationYear: year,
          cvv: body.cvv
        })
      return this.orderModel.create({ orderId: order.orderId, referenceId: body.referencedId, status: 'COMPLETED' });
    } catch (e) {
      throw new BadRequestException('Unexpected error during process')
    }
  }

  private selectProvider(cardNumber: string, currency: Currency): PaymentProviderType  {
    const cardType = this.getCardName(cardNumber);
    if (cardType === 'AMEX' && currency !== 'USD') {
      throw new BadRequestException('AMEX can only use only USD for payment')
    }

    if (['USD', 'AUD', 'EUR'].includes(currency)) {
      return 'paypal';
    }

    return 'braintree';
  }

  private getCardName(cardNumber) {
    return Object.keys(CARD_REGEX).find(key => CARD_REGEX[key].test(cardNumber));
  }
}