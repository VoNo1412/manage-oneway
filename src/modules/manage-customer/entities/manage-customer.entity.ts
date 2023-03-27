import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { Entity } from 'typeorm/decorator/entity/Entity';

export enum chooseCustomer {
    person = 'person',
    employeerEnterprise = 'employeerEnterprise',
    enterprise = 'enterprise'
}

@Entity({ name: 'manage-customer' })
export class ManageCustomer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @ApiProperty()
    name: string

    @Column()
    @ApiProperty()
    sex: boolean

    @Column()
    @ApiProperty()
    dateOfBirth: Date

    @Column()
    @ApiProperty()
    phone1: string

    @Column({ nullable: true })
    @ApiProperty()
    phone2: string

    @Column({ nullable: true })
    @ApiProperty()
    phone3: string

    @Column()
    @ApiProperty()
    married: boolean

    @Column()
    @ApiProperty()
    income: number

    @Column()
    @ApiProperty()
    familiarityLevel: string

    @Column()
    @ApiProperty()
    job: string

    @Column()
    @ApiProperty()
    enterprise: string

    @Column()
    @ApiProperty()
    email: string

    @Column()
    @ApiProperty()
    address: string

    @Column()
    @ApiProperty()
    code: string

    @Column()
    @ApiProperty()
    resource: string

    @Column()
    @ApiProperty()
    relationship: string

    @Column({nullable: true})
    @ApiProperty()
    other: string

    @Column({
        type: 'enum',
        enum: chooseCustomer,
        default: chooseCustomer.person
    })
    @ApiProperty()
    choose: string

    @Column({ nullable: true })
    @ApiProperty()
    nameEnterprise: string

    @Column({ nullable: true })
    @ApiProperty()
    phone: string

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true
    })
    @ApiProperty()
    createdDate: Date
}

