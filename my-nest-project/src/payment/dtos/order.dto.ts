import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { IsCardExpiryDate } from "src/core/validators/card-expiry-date.validator";
import { IsCardNumber } from "src/core/validators/card-number.validator";
import { Currency } from "../types/payment.type";

export class OrderDto {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsIn(['USD', 'EUR', 'THB', 'HKD', 'SGD', 'AUD'])
  @IsNotEmpty()
  currency: Currency;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @IsCardNumber()
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  cvv: string;

  @IsCardExpiryDate()
  @IsString()
  @IsNotEmpty()
  expiryDate: string;

  @IsString()
  @IsNotEmpty()
  referencedId: string;
}