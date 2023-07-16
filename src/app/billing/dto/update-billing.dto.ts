import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateBillingDto {
  @IsNotEmpty({ message: 'Preencha a Descrição' })
  @MaxLength(255, { message: 'O maximo de caracters e 255' })
  description: string;

  @Type(() => Number)
  @Min(1, { message: 'O valor minino é 1' })
  value: number;

  // @IsNotEmpty({ message: 'Insira um Status' })
  status: string;

  @IsDateString(undefined, { message: 'Preencha uma data válida' })
  dueDate: string;

  @IsNotEmpty({ message: 'Selecione um cliente' })
  @IsUUID('4', { message: 'O id do Cliente é invalido' })
  customerId: string;
}
