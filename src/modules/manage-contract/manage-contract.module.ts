import { Module } from '@nestjs/common';
import { ManageContractService } from './manage-contract.service';
import { ManageContractController } from './manage-contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageContract } from './entities/manage-contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManageContract])],
  controllers: [ManageContractController],
  providers: [ManageContractService]
})
export class ManageContractModule {}
