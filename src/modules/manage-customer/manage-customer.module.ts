import { Module } from '@nestjs/common';
import { ManageCustomerService } from './manage-customer.service';
import { ManageCustomerController } from './manage-customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManageCustomer, ManageCustomerSchema } from './entities/manage-customer.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: ManageCustomer.name, schema: ManageCustomerSchema}])],
  controllers: [ManageCustomerController],
  providers: [ManageCustomerService]
})
export class ManageCustomerModule {}
