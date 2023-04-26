import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

import { Allow, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class IimportManageCustomerDto {
    @Expose({
        name: 'Name'
    })
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string

    @Expose({
        name: 'Sex'
    })
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    sex: boolean

    @Expose({
        name: 'Age'
    })
    @IsString()
    @IsOptional()
    @ApiProperty()
    dateOfBirth: Date


    @Expose({
        name: 'Số điện thoại 1'
    })
    @IsString()
    @IsOptional()
    @ApiProperty()
    phone1: string

    @Expose({
        name: 'Số điện thoại 2'
    })
    @IsString()
    @IsOptional()
    @ApiProperty()
    phone2: string

    @Expose({
        name: 'Số điện thoại 3'
    })
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

    @IsOptional()
    @IsString()
    @ApiProperty()
    familiarityLevel: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    job: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    enterprise: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    email: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    address: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    code: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    resource: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    relationship: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    other: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    choose: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    nameEnterprise: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone: string
}

export class IimportManageCustomerDtoSpecial {
    @Expose({
        name: 'STT'
    })
    @IsOptional()
    @IsString()
    STT: string;

    @Expose({
        name: 'name'
    })
    @IsOptional()
    @IsString()
    name: string;

    @Expose({
        name: 'age'
    })
    @IsOptional()
    @IsNumber()
    age: string;

    @Expose({
        name: 'resource'
    })
    @IsOptional()
    @IsString()
    resource: string;

    @Expose({
        name: 'Thần số học'
    })
    @IsOptional()
    @IsNumber()
    superNumber: number;

    @Expose({
        name: 'Tiềm năng'
    })
    @IsOptional()
    @IsNumber()
    pointional: number;

    @Expose({
        name: 'other'
    })
    @IsOptional()
    @IsString()
    other: string;
}
