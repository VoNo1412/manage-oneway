import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { defaultValue, deleteObject } from "../helper/helper";
import { ApiProperty } from "@nestjs/swagger";

export class IPaginationDto {
    @Transform(({value}) => defaultValue(value))
    @IsNumber()
    @ApiProperty({example: 10, name: 'limit'})
    size: number = 10;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @ApiProperty({example: 1})
    page: number = 1;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    total?: number = 0;

    get offset(): number {
        return (this.page - 1) * this.size;
    }

    @Transform(({ value }) => deleteObject(value))
    filter?: { [key: string]: any }

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @ApiProperty({enum: [1, -1], description: "1 is order ASC(A-Z) and reverse -1 is DESC(Z-A)"})
    sort?: number = -1;

    [key: string]: any;
}