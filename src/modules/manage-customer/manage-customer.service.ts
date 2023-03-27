import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { UpdateManageCustomerDto } from './dto/update-manage-customer.dto';
import { chooseCustomer, ManageCustomer } from './entities/manage-customer.entity';
import { IManageCustomer } from './interface/manage-customer.interface';

@Injectable()
export class ManageCustomerService {
  constructor(@InjectModel(ManageCustomer.name) private readonly manageCustomerModel: Model<ManageCustomer>) { }

  async create(createManageCustomerDto: CreateManageCustomerDto, choose: string): Promise<IManageCustomer> {
    createManageCustomerDto.choose = choose;
    const newCustomer = new this.manageCustomerModel(createManageCustomerDto);

    newCustomer.dateOfBirth = new Date(createManageCustomerDto.dateOfBirth);

    if (choose === chooseCustomer.enterprise) {
      newCustomer.nameEnterprise = createManageCustomerDto.nameEnterprise;
      newCustomer.phone = createManageCustomerDto.phone;
    }

    newCustomer.save();

    return newCustomer;
  }

  async findAll(pageOption: IPaginationDto): Promise<IPaginationDto> {
    const total: number = await this.manageCustomerModel.count({});

    if(total < pageOption.size) {
      pageOption.page = 1;
    }

    const customers: IManageCustomer[] = await this.manageCustomerModel.find(pageOption.filter).skip(pageOption.offset).limit(pageOption.size).sort({createdDate: pageOption.sort});
    
    return {
      size: pageOption.size,
      page: pageOption.page,
      offset: pageOption.offset,
      total: total,
      customers
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} manageCustomer`;
  // }

  // update(id: number, updateManageCustomerDto: UpdateManageCustomerDto) {
  //   return `This action updates a #${id} manageCustomer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} manageCustomer`;
  // }
}
