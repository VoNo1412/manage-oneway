import { Controller, Post, Body, HttpStatus, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ManageContractService } from './manage-contract.service';
import { CreateManageContractDto } from './dto/create-manage-contract.dto';
import { IManageContract } from './interface/manage-contract.interface';
import { IResponseDto } from 'src/common/response/response.dto';
import { IPaginationDto } from 'src/common/pagination/pagination.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.jwt.guard';
@ApiTags('Manage Contract')
@Controller('manage-contract')
@UseGuards(AuthGuard)
export class ManageContractController {
  constructor(private readonly manageContractService: ManageContractService) { }

  @Post(":customerId")
  @ApiParam({ name: 'customerId', description: 'ID of the example', example: 98 })
  async create(
    @Param('customerId') customerId: number,
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
