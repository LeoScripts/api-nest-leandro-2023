import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { BillingStatusEnum } from './enum/billing-status.enum';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { DateTime } from 'luxon';
import { billingStatus } from '../helpers/billing-status.helper';

@Injectable()
export class BillingService {
  constructor(private readonly prismaService: PrismaService) {}

  async dashboard() {
    const billings = this.prismaService.billing.groupBy({
      by: ['dueDate', 'status'],
      _sum: { value: true },
      where: { deletedAt: null },
    });

    const history = (await billings).map((billing) => ({
      dueDate: DateTime.fromJSDate(billing.dueDate).toFormat('yyyy-MM-dd'),
      value: Number(billing._sum.value),
      status: billing.status,
    }));

    // melhorei essa estrutura que estava se repetindo 3x
    // const pending = history
    //   .filter(({ status }) => status === BillingStatusEnum.PENDING)
    //   .reduce((total, current) => (total += current.value), 0);

    const pending = billingStatus(history, BillingStatusEnum.PENDING);
    const late = billingStatus(history, BillingStatusEnum.LATE);
    const paid = billingStatus(history, BillingStatusEnum.PAID);

    const customers = await this.prismaService.customer.count({
      where: { deletedAt: null },
    });

    return {
      customers,
      pending,
      late,
      paid,
      history,
    };
  }

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

  async updateById(id: string, data: UpdateBillingDto) {
    await this.findOneById(id);
    return await this.prismaService.billing.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteById(id: string) {
    await this.findOneById(id);
    await this.prismaService.billing.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
