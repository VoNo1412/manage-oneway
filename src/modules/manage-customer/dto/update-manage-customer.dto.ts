import { PartialType } from '@nestjs/mapped-types';
import { CreateManageCustomerDto } from './create-manage-customer.dto';

export class UpdateManageCustomerDto extends PartialType(CreateManageCustomerDto) {}
