import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ManageCustomerDocument = HydratedDocument<ManageCustomer>;

export enum chooseCustomer {
    person = 'person',
    employeerEnterprise = 'employeerEnterprise',
    enterprise = 'enterprise'
}

@Schema()
export class ManageCustomer {
    @Prop()
    @ApiProperty()
    name: string

    @Prop()
    @ApiProperty()
    sex: boolean

    @Prop()
    @ApiProperty()
    dateOfBirth: Date

    @Prop()
    @ApiProperty()
    phone1: string

    @Prop()
    @ApiProperty()
    phone2: string

    @Prop()
    @ApiProperty()
    phone3: string

    @Prop()
    @ApiProperty()
    married: boolean

    @Prop()
    @ApiProperty()
    income: number

    @Prop()
    @ApiProperty()
    familiarityLevel: string

    @Prop()
    @ApiProperty()
    job: string

    @Prop()
    @ApiProperty()
    enterprise: string

    @Prop()
    @ApiProperty()
    email: string

    @Prop()
    @ApiProperty()
    address: string

    @Prop()
    @ApiProperty()
    code: string

    @Prop()
    @ApiProperty()
    resource: string

    @Prop()
    @ApiProperty()
    relationship: string

    @Prop()
    @ApiProperty()
    other: string

    @Prop({ Type: String, enum: chooseCustomer })
    @ApiProperty()
    choose: string

    @Prop()
    @ApiProperty()
    nameEnterprise: string

    @Prop()
    @ApiProperty()
    phone: string

    @Prop({ default: Date.now() })
    @ApiProperty()
    createdDate: Date
}

export const ManageCustomerSchema = SchemaFactory.createForClass(ManageCustomer);
