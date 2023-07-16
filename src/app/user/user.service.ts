import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      where: { deletedAt: null },
    });
  }

  async createNew(data: CreateUserDto) {
    try {
      data.password = this.hashPassword(data.password);
      const user = this.prismaService.user.create({ data });
      delete (await user).password;
      return user;
    } catch (error) {
      throw new BadRequestException(error.message); //nescessario tratar
    }
  }

  async findOneById(id: string) {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
        where: { id, deletedAt: null },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, data: UpdateUserDto) {
    try {
      await this.findOneById(id);
      const user = this.prismaService.user.update({
        where: { id },
        data: { ...data, updatedAt: new Date() },
      });
      delete (await user).password;
      return user;
    } catch (error) {}
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  hashPassword(password: string) {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }
}
