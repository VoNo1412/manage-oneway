import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile, Delete, Param, ParseArrayPipe } from '@nestjs/common';
import { ManageCustomerService } from './manage-customer.service';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { IResponseDto } from 'src/common/response/response.dto';
import { IManageCustomer } from './interface/manage-customer.interface';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { IimportManageCustomerDto, IimportManageCustomerDtoSpecial } from './dto/import-manage-customer.dto';
import { ParseXlsxPipe } from 'src/common/pipes/parse.xlsx';

@Controller('manage-customer')
export class ManageCustomerController {
  constructor(private readonly manageCustomerService: ManageCustomerService) { }

  @Delete(':customerId')
  async remove(
    @Param("customerId") customerId: number
  ) {
    return await this.manageCustomerService.deleteCustomer(customerId)
  }

  @Post()
  async create(
    @Body() createManageCustomerDto: CreateManageCustomerDto,
    @Query('choose') chooseCustomer: string):
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
  async search(@Query() pageOption: IPaginationDto):
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
    ) customersDto:IimportManageCustomerDtoSpecial): 
    Promise<IResponseDto<IManageCustomer>> {
      const data = await this.manageCustomerService.importFile(customersDto);

      return {
        status: HttpStatus.OK,
        data: data,
        message: 'import customer success!'
      }
  }
}