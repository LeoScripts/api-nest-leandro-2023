import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

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
}
