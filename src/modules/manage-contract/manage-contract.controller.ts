import { Controller, Post, Body, HttpStatus, Get, Query, Param } from '@nestjs/common';
import { ManageContractService } from './manage-contract.service';
import { CreateManageContractDto } from './dto/create-manage-contract.dto';
import { IManageContract } from './interface/manage-contract.interface';
import { IResponseDto } from 'src/common/response/response.dto';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';

@Controller('manage-contract')
export class ManageContractController {
  constructor(private readonly manageContractService: ManageContractService) { }

  @Post(":customerId")
  async create(
    @Param("customerId") customerId: number,
    @Body() createManageContractDto: CreateManageContractDto): Promise<IResponseDto<IManageContract>> {
    try {
      const newManageContract: IManageContract = await
        this.manageContractService.create(createManageContractDto, customerId);

      return {
        status: HttpStatus.OK,
        data: newManageContract,
        message: 'Create contract success'
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
      const contracts: IPaginationDto = await this.manageContractService.findAll(pageOption);

      return {
        status: HttpStatus.OK,
        data: contracts,
        message: 'get contracts success!'
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
