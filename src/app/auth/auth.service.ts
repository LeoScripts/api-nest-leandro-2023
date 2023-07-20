import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { DateTime } from 'luxon';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user) {
    const token = this.jwtService.sign(user);
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    const expiresIn = DateTime.fromMillis(payload.exp * 1000)
      .toUTC()
      .toISO();

    return {
      token: this.jwtService.sign(user),
      expiresIn,
      user,
    };
  }

  async validate(email: string, password: string) {
    try {
      const user = await this.userService.findOneByEmail(email);
      const isValid = this.userService.validadePassword(
        password,
        user.password,
      );

      if (!isValid) throw new Error();
      delete user.password;
      return user;
    } catch (error) {
      throw new ForbiddenException('Email ou Senha invalidos!');
    }
  }
}
