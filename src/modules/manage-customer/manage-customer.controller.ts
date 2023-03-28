import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile, Header } from '@nestjs/common';
import { ManageCustomerService } from './manage-customer.service';
import { CreateManageCustomerDto } from './dto/create-manage-customer.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { IResponseDto } from 'src/common/response/response.dto';
import { IManageCustomer } from './interface/manage-customer.interface';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import * as Path from 'path';
import { diskStorage } from 'multer';

@Controller('manage-customer')
export class ManageCustomerController {
  constructor(private readonly manageCustomerService: ManageCustomerService) { }

  @Post()
  async create(
    @Body() createManageCustomerDto: CreateManageCustomerDto,
    @Query('choose') chooseCustomer: string): Promise<IResponseDto<IManageCustomer>> {
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
      const customers: IPaginationDto = await this.manageCustomerService.findAll(pageOption);

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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    console.log(file);
    // const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    // const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // let range = XLSX.utils.decode_range(worksheet['!ref']);
    // const data = [];

    // for (let row = range.s.r; row <= range.e.r; row++) {
    //   const rowData = [];

    //   for (let col = range.s.c; col <= range.e.c; col++) {
    //     const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
    //     const cell = worksheet[cellAddress];
    //     const cellValue = cell ? cell.v : '';
    //     rowData.push(cellValue);
    //   }

    //   data.push(rowData);
    // }
  }
}