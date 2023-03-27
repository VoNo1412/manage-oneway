import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { Repository } from 'typeorm';
import { CreateManageContractDto } from './dto/create-manage-contract.dto';
import { ManageContract } from './entities/manage-contract.entity';
import { IManageContract } from './interface/manage-contract.interface';

@Injectable()
export class ManageContractService {
  constructor(@InjectRepository(ManageContract) 
  private readonly manageContractRepsitory: Repository<ManageContract>) {}

  async create(createManageContractDto: CreateManageContractDto): Promise<IManageContract> {
    const newManageContract = await this.manageContractRepsitory.create(createManageContractDto);
    return await this.manageContractRepsitory.save(newManageContract);
  }

  async findAll(pageOption: IPaginationDto): Promise<IPaginationDto> {
    const total: number = await this.manageContractRepsitory.count({});
    total < pageOption.size ? pageOption.page = 1 : pageOption.page
    const contracts: IManageContract[] =
      await this.manageContractRepsitory.find({
        take: pageOption.size,
        skip: pageOption.offset,
        where: pageOption.filter,
        order: { createdDate: pageOption.sort as any }
      })

    return {
      size: pageOption.size,
      page: pageOption.page,
      offset: pageOption.offset,
      total: total,
      contracts
    };
  }
}
