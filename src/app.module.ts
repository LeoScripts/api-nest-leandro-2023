import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { CustomerModule } from './app/customer/customer.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
