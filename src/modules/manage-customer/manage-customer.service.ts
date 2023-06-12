import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { Repository } from 'typeorm';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { chooseCustomer, ManageCustomer } from './entities/manage-customer.entity';
import { IManageCustomer } from './interface/manage-customer.interface';
import {  IimportManageCustomerDtoSpecial } from './dto/import-manage-customer.dto';
import * as xlsx from 'xlsx';

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
      .dateOfBirth(createManageCustomerDto.dateOfBirth)
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

    const newCustomer =  this.manageCustomerRepository.create(manageCustomerBuilder);

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

  async importFile(customers: IimportManageCustomerDtoSpecial): Promise<any> {
    return customers;
  }

  async exportFile() {
    const data = await this.manageCustomerRepository.find()
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'SpeechScript');
    return xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
  }

  async findCustomerById(id: number) {
    const customer = this.manageCustomerRepository.findOneBy({ id });
    if (!customer) {
      throw new HttpException('customer doesn"t not exist', HttpStatus.NOT_FOUND);
    }

    return customer;
  }
}
