import { PartialType } from '@nestjs/mapped-types';
import { CreateManageContractDto } from './create-manage-contract.dto';

export class UpdateManageContractDto extends PartialType(CreateManageContractDto) {}
