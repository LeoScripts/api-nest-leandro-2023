import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('api/v1/billings')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  async findAll() {
    return this.billingService.findAll();
  }
}
