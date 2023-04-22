import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

import { IsBoolean, IsNumber, IsString } from "class-validator"

export class IimportManageCustomerDto {
    @Expose({
        name: 'Name'
    })
    @ApiProperty()
    @IsString()
    name?: string

    @Expose({
        name: 'Sex'
    })
    @ApiProperty()
    @IsBoolean()
    sex?: boolean

    @Expose({
        name: 'Age'
    })
    @IsString()
    @ApiProperty()
    dateOfBirth?: Date

    
    @Expose({
        name: 'Số điện thoại 1'
    })
    @IsString()
    @ApiProperty()
    phone1?: string

    @Expose({
        name: 'Số điện thoại 2'
    })
    @IsString()
    @ApiProperty()
    phone2?: string

    @Expose({
        name: 'Số điện thoại 3'
    })
    @IsString()
    @ApiProperty()
    phone3?: string

    @ApiProperty()
    @IsBoolean()
    married?: boolean

    @ApiProperty()
    @IsNumber()
    income?: number

    @IsString()
    @ApiProperty()
    familiarityLevel?: string

    @IsString()
    @ApiProperty()
    job?: string

    @IsString()
    @ApiProperty()
    enterprise?: string

    @IsString()
    @ApiProperty()
    email?: string

    @IsString()
    @ApiProperty()
    address?: string

    @IsString()
    @ApiProperty()
    code?: string

    @IsString()
    @ApiProperty()
    resource?: string

    @IsString()
    @ApiProperty()
    relationship?: string

    @IsString()
    @ApiProperty()
    other?: string

    @IsString()
    @ApiProperty()
    choose?: string

    @IsString()
    @ApiProperty()
    nameEnterprise?: string

    @IsString()
    @ApiProperty()
    phone?: string
}
