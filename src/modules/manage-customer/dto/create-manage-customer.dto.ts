import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"

import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateManageCustomerDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    sex: boolean

    @IsDate()
    @ApiProperty()
    @IsOptional()
    @Transform(({value}) => new Date(value))
    dateOfBirth: Date

    @IsString()
    @ApiProperty()
    @IsOptional()
    phone1: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    phone2: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    phone3: string

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    married: boolean

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    income: number

    @IsString()
    @ApiProperty()
    @IsOptional()
    familiarityLevel: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    job: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    enterprise: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    email: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    address: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    code: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    resource: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    relationship: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    other: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    choose: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    nameEnterprise: string

    @IsString()
    @ApiProperty()
    @IsOptional()
    phone: string
}
