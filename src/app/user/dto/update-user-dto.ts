import { IsEmail, Length, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @Length(2, 20, { message: 'O (nome) deve ter mais de 1 letra' })
  firstName: string;

  @Length(3, 50, { message: 'o (sobrenome) deve ter mais de 2 letra' })
  lastName: string;

  @IsEmail({}, { message: 'Digite um (email) Valido!' })
  @MaxLength(100, { message: 'O (email) deve ter ate 255 caracters' })
  email: string;
}
