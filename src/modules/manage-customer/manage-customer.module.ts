import { Module } from '@nestjs/common';
import { ManageCustomerService } from './manage-customer.service';
import { ManageCustomerController } from './manage-customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageCustomer } from './entities/manage-customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManageCustomer])],
  controllers: [ManageCustomerController],
  providers: [ManageCustomerService]
})
export class ManageCustomerModule {}
