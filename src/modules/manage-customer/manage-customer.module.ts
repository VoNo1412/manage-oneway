import { Module } from '@nestjs/common';
import { ManageCustomerService } from './manage-customer.service';
import { ManageCustomerController } from './manage-customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageCustomer } from './entities/manage-customer.entity';
import { JwtHelper } from '../auth/helper/jwt.helper';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManageCustomer]),
    UserModule
  ],
  controllers: [ManageCustomerController],
  providers: [ManageCustomerService, JwtHelper],
  exports: [ManageCustomerService]
})
export class ManageCustomerModule {}
