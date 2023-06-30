import { ICard } from "src/payment/interfaces/card.interface";
import { IPaymentProvider } from "../payment-factory.service";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { HttpRequestService } from "../../../core/services/http-request.service";
import { IOrder } from "src/payment/interfaces/order.interface";

@Injectable()
export class PaypalProvider implements IPaymentProvider {
  @Inject(HttpRequestService)
  private httpRequestService: HttpRequestService

  private token: { accessToken: string, createdTime: number, expireIn: number };


  async oneTimePaymentCreditCard(payload: IOrder, card: ICard) {
    try {
      const response = await this.httpRequestService.execute<{ id: string, status: string }>({
        method: 'POST',
        data: {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: payload.currency,
              value: payload.amount
            },
            customId: payload.customId
          }],
          payment_source: {
            card: {
              name: card.name,
              number: card.number,
              expiry: `${card.expirationYear}-${card.expirationMonth}`,
              security_code: card.cvv
            }
          }
        },
        url: `${process.env.PAYPAL_API_URL}/v2/checkout/orders`,
        headers: await this.generateHeader()
      })
      return { orderId: response.id, status: response.status }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async captureOrder(orderId: string, card: ICard) {
    await this.retrieveAccessToken()
    const response = await this.httpRequestService.execute<{ id: string; status: string }>({
      method: 'POST',
      headers: await this.generateHeader(),
      url: `${process.env.PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      data: {
        payment_source: {
          card: {
            name: card.name,
            number: card.number,
            expiry: `${card.expirationYear}-${card.expirationMonth}`,
            security_code: card.cvv
          }
        }
      }
    })
    return { orderId: response.id, status: response.status }
  }

  async retrieveAccessToken() {
    const res = await this.httpRequestService.execute<{ access_token: string, expires_in: number }>({
      method: 'POST',
      url: `${process.env.PAYPAL_API_URL}/v1/oauth2/token`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET_KEY
      },
      data: { grant_type: 'client_credentials' }
    })
    return { accessToken: res.access_token, expireIn: res.expires_in }
  }

  private async generateHeader() {
    if (!this.token || Date.now() > this.token.createdTime + this.token.expireIn) {
      let token = await this.retrieveAccessToken();
      this.token = { accessToken: token.accessToken, expireIn: token.expireIn, createdTime: Date.now() }
    }
    return {
      'Content-Type': 'application/json',
      'PayPal-Request-Id': Math.random().toPrecision(12).toString(),
      'Authorization': `Bearer ${this.token.accessToken}`
    }
  }
}