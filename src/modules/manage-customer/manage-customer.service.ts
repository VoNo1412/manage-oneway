import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { Repository } from 'typeorm';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { chooseCustomer, ManageCustomer } from './entities/manage-customer.entity';
import { IManageCustomer } from './interface/manage-customer.interface';
import * as xlsx from 'xlsx';
import { IimportManageCustomerDto, IimportManageCustomerDtoSpecial } from './dto/import-manage-customer.dto';
import * as _ from 'lodash';

@Injectable()
export class ManageCustomerService {
  constructor(
    @InjectRepository(ManageCustomer)
    private readonly manageCustomerRepository: Repository<ManageCustomer>) { }

  async deleteCustomer(id: number) {
    return this.manageCustomerRepository.delete({ id });
  }

  async create(
    createManageCustomerDto: CreateManageCustomerDto,
    chooseQuery: string): Promise<IManageCustomer> {

    const manageCustomerBuilder = Builder<ManageCustomer>()
      .name(createManageCustomerDto.name)
      .sex(createManageCustomerDto.sex)
      .dateOfBirth(new Date(createManageCustomerDto.dateOfBirth))
      .phone1(createManageCustomerDto.phone1)
      .phone2(createManageCustomerDto.phone2)
      .phone3(createManageCustomerDto.phone3)
      .married(createManageCustomerDto.married)
      .income(createManageCustomerDto.income)
      .familiarityLevel(createManageCustomerDto.familiarityLevel)
      .job(createManageCustomerDto.job)
      .enterprise(createManageCustomerDto.enterprise)
      .email(createManageCustomerDto.email)
      .address(createManageCustomerDto.address)
      .code(createManageCustomerDto.code)
      .resource(createManageCustomerDto.resource)
      .relationship(createManageCustomerDto.relationship)
      .choose(chooseQuery)
      .build()

    const newCustomer = await this.manageCustomerRepository.create(manageCustomerBuilder);

    if (chooseQuery === chooseCustomer.enterprise) {
      newCustomer.nameEnterprise = createManageCustomerDto.nameEnterprise;
      newCustomer.phone = createManageCustomerDto.phone;
    }

    return this.manageCustomerRepository.save(newCustomer);
  }

  async findAll(pageOption: IPaginationDto): Promise<IPaginationDto> {
    const total: number = await this.manageCustomerRepository.count({});
    total < pageOption.size ? pageOption.page = 1 : pageOption.page
    const customers: IManageCustomer[] =
      await this.manageCustomerRepository.find({
        take: pageOption.size,
        skip: pageOption.offset,
        order: { id: -1 },
      })

    return {
      size: pageOption.size,
      page: pageOption.page,
      offset: pageOption.offset,
      total: total,
      customers
    };
  }

  async importFile(customers: IimportManageCustomerDtoSpecial[]): Promise<any> {
      const resultData = _.groupBy(customers, cus => cus.name)
      const cus = customers.map(cus => (
        Builder<IimportManageCustomerDtoSpecial>()
        .STT(resultData[cus.name][0].STT)
        .name(resultData[cus.name][0].name)
        .age(resultData[cus.name][0].age)
        .other(resultData[cus.name][0].other)
        .superNumber(resultData[cus.name][0].superNumber)
        .pointional(resultData[cus.name][0].pointional)
        .resource(resultData[cus.name][0].resource)
        .build()
      ))
      return cus;
  }

  async findCustomerById(id: number) {
    const customer = this.manageCustomerRepository.findOneBy({ id });
    if (!customer) {
      throw new HttpException('customer doesn"t not exist', HttpStatus.NOT_FOUND);
    }

    return customer;
  }
}
