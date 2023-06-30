import { BadRequestException } from '@nestjs/common';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  export function IsCardNumber(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: CardNumberValidation,
      });
    };
  }
  
  @ValidatorConstraint({ name: 'isCardNumber', async: false })
  export class CardNumberValidation implements ValidatorConstraintInterface {
    constructor() {}
  
    validate(value: string): boolean {
      return /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(value)
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
      return 'Please enter a valid credit card number.'
    }
  }