import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { BillingStatusEnum } from './enum/billing-status.enum';

@Injectable()
export class BillingService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.billing.findMany({
      select: {
        id: true,
        description: true,
        status: true,
        value: true,
        dueDate: true,
      },
      where: { deletedAt: null },
    });
  }

  async createNew(data: CreateBillingDto, userId: string) {
    try {
      const { customerId, ...rest } = data;
      return await this.prismaService.billing.create({
        data: {
          ...rest,
          status: BillingStatusEnum.PENDING,
          customer: { connect: { id: customerId } }, //aqui estou dizendo que o campo customer/customerId e o id da tabela customer
          user: { connect: { id: userId } },
        },
      });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOneById(id: string) {
    return await this.prismaService.billing.findFirstOrThrow({
      select: {
        id: true,
        description: true,
        status: true,
        value: true,
        dueDate: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id, deletedAt: null },
    });
  }
}
