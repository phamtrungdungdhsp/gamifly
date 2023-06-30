import { BadRequestException } from '@nestjs/common';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  export function IsCardExpiryDate(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: CardExpiryDateValidation,
      });
    };
  }
  
  @ValidatorConstraint({ name: 'cardExpiryDate', async: false })
  export class CardExpiryDateValidation implements ValidatorConstraintInterface {
    constructor() {}
  
    validate(value: string): boolean {
      if (!/^((0?[1-9]|1[0-2])\/\d{4})$/.test(value)) {
        return false;
      }
      const now = new Date();
      const [month, year] = value.split('/')
      if (+year < now.getFullYear() || +year === now.getFullYear() && +month < now.getMonth() +1) {
        return false;
      }
      return true;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
      return 'Invalid card expiry date format. It should be DD/YYYY and should be a moment in the future'
    }
  }