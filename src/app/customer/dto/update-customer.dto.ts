import {
  IsEmail,
  IsNotEmpty,
  Length,
  MaxLength,
  Validate,
} from 'class-validator';
import { CpfCnpjValidator } from 'src/app/validators/cpfCnpj.validator';
import { IsValidPhoneNumber } from 'src/app/validators/valid-phone-number.validator';

export class UpdateCustomerDto {
  @Length(2, 100, { message: 'O nome de ter mais de uma letra' })
  name: string;

  @IsNotEmpty({ message: 'Digite um CPF ou CNPJ valido' })
  @Validate(CpfCnpjValidator)
  cpfCnpj: string;

  @IsEmail(undefined, { message: 'Digite um email válido!' })
  @MaxLength(100, { message: 'O email deve ter ate 100!' })
  email: string;

  //@Validate(CellphoneValidator) // se o telefone nao vir corretamente (99) 9999-9999 ou (99) 99999-9999 retornara um erro
  @IsValidPhoneNumber()
  cellphone: string;
}
