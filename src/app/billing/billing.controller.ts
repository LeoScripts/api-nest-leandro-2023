import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';

@Controller('api/v1/billings')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('dashboard')
  async dashboard() {
    return this.billingService.dashboard();
  }

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

  @Patch(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBillingDto,
  ) {
    return this.billingService.updateById(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.billingService.deleteById(id);
  }
}
