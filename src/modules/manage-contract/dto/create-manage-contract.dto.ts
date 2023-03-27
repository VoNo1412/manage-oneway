import { IsString } from "class-validator";


export class CreateManageContractDto {
    @IsString()
    codeNumber: string

    @IsString()
    nameBuyer: string;

    @IsString()
    nameBenifit: string;

    @IsString()
    valueContract: string;

    @IsString()
    effectDate: string;

    @IsString()
    paymentYear: string;

    @IsString()
    cycle: string;
}


