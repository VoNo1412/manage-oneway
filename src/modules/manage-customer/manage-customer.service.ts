import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { Repository } from 'typeorm';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { chooseCustomer, ManageCustomer } from './entities/manage-customer.entity';
import { IManageCustomer } from './interface/manage-customer.interface';
import * as XLSX from 'xlsx';
import { IimportManageCustomerDto } from './dto/import-manage-customer.dto';
import * as _ from 'lodash';

@Injectable()
export class ManageCustomerService {
  constructor(
    @InjectRepository(ManageCustomer)
    private readonly manageCustomerRepository: Repository<ManageCustomer>) { }
  async create(
    createManageCustomerDto: CreateManageCustomerDto,
    chooseQuery: string): Promise<IManageCustomer> {
    const { name,
      sex,
      dateOfBirth,
      phone1,
      phone2,
      phone3,
      married,
      income,
      familiarityLevel,
      job,
      enterprise,
      email,
      address,
      code,
      resource,
      relationship } = createManageCustomerDto;

    const manageCustomerBuilder = Builder<ManageCustomer>()
      .name(name)
      .sex(sex)
      .dateOfBirth(new Date(dateOfBirth))
      .phone1(phone1)
      .phone2(phone2)
      .phone3(phone3)
      .married(married)
      .income(income)
      .familiarityLevel(familiarityLevel)
      .job(job)
      .enterprise(enterprise)
      .email(email)
      .address(address)
      .code(code)
      .resource(resource)
      .relationship(relationship)
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
        where: pageOption.filter,
        order: { createdDate: pageOption.sort as any }
      })

    return {
      size: pageOption.size,
      page: pageOption.page,
      offset: pageOption.offset,
      total: total,
      customers
    };
  }

  async importFile(file: Express.Multer.File): Promise<any> {
   

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    const data = _.range(range.s.r, range.e.r + 1).map(row => (
      _.range(range.s.c, range.e.c + 1).map(col => {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellAddress];
        return cell ? cell.v : '';
      })
    ));

    console.log(_(data).slice(1).map(row => console.log(row)));

    const promises = _(data)
      .slice(1)
      .map(row => (
        Builder<ManageCustomer>()
          .name(row[0])
          .resource(row[1])
          .phone(row[2])
          .build()
      ))
      .map(customer => (
        this.manageCustomerRepository.save(customer)
      ))
      .value();
  }
}
