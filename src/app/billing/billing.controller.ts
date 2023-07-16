import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';

@Controller('api/v1/billings')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  async findAll() {
    return this.billingService.findAll();
  }

  @Post()
  async createNew(@Body() body: CreateBillingDto) {
    const userId = '9c059a89-b45c-49f8-a02c-f98d9751b1c2';
    return this.billingService.createNew(body, userId);
  }

  @Get(':id')
  async findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.billingService.findOneById(id);
  }
}
