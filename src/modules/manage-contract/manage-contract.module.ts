import { Module } from '@nestjs/common';
import { ManageContractService } from './manage-contract.service';
import { ManageContractController } from './manage-contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageContract } from './entities/manage-contract.entity';
import { ManageCustomerModule } from '../manage-customer/manage-customer.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManageContract]),
  ManageCustomerModule,
  AuthModule
],
  controllers: [ManageContractController],
  providers: [ManageContractService]
})
export class ManageContractModule {}
