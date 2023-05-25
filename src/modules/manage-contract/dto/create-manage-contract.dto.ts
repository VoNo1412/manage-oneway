import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateManageContractDto {
    @IsString()
    @ApiProperty({ description: 'The code of the customer', example: 'IU1412' })
    codeNumber: string

    @ApiProperty({ description: 'The customer buy something', example: 'buyer' })
    @IsString()
    nameBuyer: string;

    @IsString()
    @ApiProperty({ description: 'The customer"s benifit', example: 'coin' })
    nameBenifit: string;

    @IsString()
    @ApiProperty({ description: 'The value of contract', example: 'IU1412' })
    valueContract: string;

    @IsString()
    @ApiProperty({ description: 'This is begin start date', example: '25-May-23' })
    effectDate: string;

    @IsString()
    @ApiProperty({ description: 'This is process buy in year', example: 'Book' })
    paymentYear: string;

    @IsString()
    @ApiProperty({ description: 'The code of the customer', example: 'IU1412' })
    cycle: string;
}


