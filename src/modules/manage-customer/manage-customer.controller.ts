import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile, Delete, Param, ParseArrayPipe, Res, UseGuards, SerializeOptions, ClassSerializerInterceptor } from '@nestjs/common';
import { ManageCustomerService } from './manage-customer.service';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { IResponseDto } from 'src/common/response/response.dto';
import { IManageCustomer } from './interface/manage-customer.interface';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IimportManageCustomerDtoSpecial } from './dto/import-manage-customer.dto';
import { ParseXlsxPipe } from 'src/common/pipes/parse.xlsx';
import { Response } from 'express';
import { SetHeaderInterceptor } from './helper/setHeader.helper';
import { AuthGuard } from '../auth/guard/auth.jwt.guard';
import { IUserEntity } from '../user/interface/user.interface';
import { chooseCustomer } from './entities/manage-customer.entity';
import { CustomerSerilization } from './interceptor/manage-customer.interceptor';
import { User } from 'src/common/decorators/user.decorators';

@ApiTags('Manage Customer')
@UseGuards(AuthGuard)
@Controller('manage-customer')
export class ManageCustomerController {
  constructor(private readonly manageCustomerService: ManageCustomerService) { }

  @Delete(':customerId')
  @ApiOperation({ summary: 'Deleted customer by ID', description: 'Deleted one customer' })
  @ApiParam({name: 'customerId', description: 'this is id of customer!', example: '98'})
  async remove(
    @Param("customerId") customerId: number
  ) {
    return await this.manageCustomerService.deleteCustomer(customerId)
  }

  @Post()
  @ApiBody({description: 'create a new customer', type: CreateManageCustomerDto})
  @ApiQuery({name: 'choose', description: 'this is type customer', enum: chooseCustomer})
  async create(
    @Body() createManageCustomerDto: CreateManageCustomerDto,
    @Query("chooseCustomer") chooseCustomer: string):
    Promise<IResponseDto<IManageCustomer>> {
    try {
      const newCustomer: IManageCustomer = await
        this.manageCustomerService.create(createManageCustomerDto, chooseCustomer);

      return {
        status: HttpStatus.OK,
        data: newCustomer,
        message: 'Create customer success'
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: error.message
      }
    }
  }

  @Get()
  // @UseInterceptors(CustomerSerilization)
  // @UseInterceptors(ClassSerializerInterceptor)
  // @SerializeOptions({
  //   strategy: 'excludeAll'
  // })
  async search(
    @Query() pageOption: IPaginationDto,
    @User() user: IUserEntity
  ):
    Promise<IResponseDto<IPaginationDto>> {
    try {
      const customers: IPaginationDto =
        await this.manageCustomerService.findAll(pageOption);

      return {
        status: HttpStatus.OK,
        data: customers,
        message: 'get customer success!'
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: error.message
      }
    }
  }

  @Get('export')
  @UseInterceptors(SetHeaderInterceptor)
  async exportFile(@Res() res: Response) {
    const buffer = await this.manageCustomerService.exportFile()
    return res.send(buffer);
  }


  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseXlsxPipe(),
      new ParseArrayPipe({
        items: IimportManageCustomerDtoSpecial,
        whitelist: true
      })
    ) customersDto: IimportManageCustomerDtoSpecial):
    Promise<IResponseDto<IManageCustomer>> {
    const data = await this.manageCustomerService.importFile(customersDto);

    return {
      status: HttpStatus.OK,
      data: data,
      message: 'import customer success!'
    }
  }
}