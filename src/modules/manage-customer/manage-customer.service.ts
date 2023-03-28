import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { Repository } from 'typeorm';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { chooseCustomer, ManageCustomer } from './entities/manage-customer.entity';
import { IManageCustomer } from './interface/manage-customer.interface';
import * as XLSX from 'xlsx';

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

    const manageCustomerBuilder = Builder<IManageCustomer>()
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
    const data = [];
    const db = [];
    for (let row = range.s.r; row <= range.e.r; row++) {
      const rowData = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellAddress]
        const value = cell ? cell.v : '';
        rowData.push(value);
      }

      data.push(rowData);
    }

    const refactorData = async (data: string[]) => {
      const promises = [];

      for (let i = 1; i < data.length; i++) {
        const person: CreateManageCustomerDto = {};
        for (let j = 0; j < data[i].length; j++) {
          person[`${data[0][j]}`] = data[i][j]
        }

        // I don't know flow code and field 
        const manageCustomerBuilder = Builder<IManageCustomer>()
          .name(person.name)
          .resource(person.resource)
          .phone(person.phone1)
          .build();

        const newCustomer = this.manageCustomerRepository.create(manageCustomerBuilder);
        db.push(newCustomer);
        const resultCustomer = await this.manageCustomerRepository.save(newCustomer);
        promises.push(this.manageCustomerRepository.save(resultCustomer));
      }

      await Promise.all(promises);
    }

    refactorData(data);

    return db;
  }
}
