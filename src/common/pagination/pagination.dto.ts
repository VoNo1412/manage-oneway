import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { defaultValue, deleteObject } from "../helper/helper";

export class IPaginationDto {
    @Transform(({value}) => defaultValue(value))
    @IsNumber()
    size: number = 10;

    @Transform(({ value }) => Number(value))
    @IsNumber()
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
    sort?: number = -1;

    [key: string]: any;
}