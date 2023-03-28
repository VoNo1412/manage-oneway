import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile, Header } from '@nestjs/common';
import { ManageCustomerService } from './manage-customer.service';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { IResponseDto } from 'src/common/response/response.dto';
import { IManageCustomer } from './interface/manage-customer.interface';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('manage-customer')
export class ManageCustomerController {
  constructor(private readonly manageCustomerService: ManageCustomerService) { }

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

  @ApiConsumes('multipart/form-data')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): 
  Promise<IResponseDto<IManageCustomer>> {
    try {
      const customers: IManageCustomer[] = 
      await this.manageCustomerService.importFile(file);

      return {
        status: HttpStatus.OK,
        data: customers,
        message: 'import customer success!'
      }
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: error.message
      }
    }
  }
}