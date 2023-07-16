import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Função de validação personalizada para o número de celular
function isValidPhoneNumber(value: string): boolean {
  // Implemente sua lógica de validação de número de celular aqui
  // Exemplo de validação : verificar se o número possui o formato (11) 11111-1111
  const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/; // meu padrao
  return regex.test(value);
}

// Classe de validação personalizada usando class-validator
@ValidatorConstraint({ name: 'isValidPhoneNumber', async: false })
export class IsValidPhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: string, args: ValidationArguments) {
    return isValidPhoneNumber(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'O numero deve estar no formato (98) 99999-9999';
  }
}

// Decorator personalizado usando class-validator
export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidPhoneNumberConstraint,
    });
  };
}
