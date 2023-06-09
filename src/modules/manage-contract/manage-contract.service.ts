import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { Repository } from 'typeorm';
import { CreateManageContractDto } from './dto/create-manage-contract.dto';
import { ManageContract } from './entities/manage-contract.entity';
import { IManageContract } from './interface/manage-contract.interface';
import { ManageCustomerService } from '../manage-customer/manage-customer.service';
import { Builder } from 'builder-pattern';

@Injectable()
export class ManageContractService {
  constructor(
    @InjectRepository(ManageContract)
    private readonly manageContractRepsitory: Repository<ManageContract>,
    private readonly customerService: ManageCustomerService
  ) { }

  async create(createManageContractDto: CreateManageContractDto, customerId: number): Promise<IManageContract> {
    const customer = await this.customerService.findCustomerById(customerId);
    const contractBuilder = Builder<ManageContract>()
      .codeNumber(createManageContractDto.codeNumber)
      .nameBenifit(createManageContractDto.nameBenifit)
      .nameBuyer(createManageContractDto.nameBuyer)
      .valueContract(createManageContractDto.valueContract)
      .effectDate(createManageContractDto.effectDate)
      .paymentYear(createManageContractDto.paymentYear)
      .cycle(createManageContractDto.cycle)
      .customers(customer)
      .build()
      
    const newManageContract = this.manageContractRepsitory.create(contractBuilder);

    return await this.manageContractRepsitory.save(newManageContract);
  }

  async findAll(pageOption: IPaginationDto): Promise<IPaginationDto> {
    const contracts = await this.manageContractRepsitory
      .createQueryBuilder("contract")
      .leftJoin('contract.customers', 'cus')
      .select(['cus.name', 'cus.phone', 'contract'])
      .orderBy('contract.createdDate', 'DESC')
      .getMany()
      
    return {
      size: pageOption.size,
      page: pageOption.page,
      offset: pageOption.offset,
      total: contracts.length,
      contracts
    };
  }
}
