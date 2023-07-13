import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ManageContract } from 'src/modules/manage-contract/entities/manage-contract.entity';
import { CreateDateColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
    @Expose()
    name: string

    @Column({ nullable: true })
    @ApiProperty()
    sex: boolean

    @Column({ nullable: true, type: 'date' })
    @ApiProperty()
    dateOfBirth: Date

    @Column({ nullable: true })
    @ApiProperty()
    phone1: string

    @Column({ nullable: true })
    @ApiProperty()
    phone2: string

    @Column({ nullable: true })
    @ApiProperty()
    phone3: string

    @Column({ nullable: true })
    @ApiProperty()
    married: boolean

    @Column({ nullable: true })
    @ApiProperty()
    income: number

    @Column({ nullable: true })
    @ApiProperty()
    familiarityLevel: string

    @Column({ nullable: true })
    @ApiProperty()
    job: string

    @Column({ nullable: true })
    @ApiProperty()
    enterprise: string

    @Column({ nullable: true })
    @ApiProperty()
    email: string

    @Column({ nullable: true })
    @ApiProperty()
    address: string

    @Column({ nullable: true })
    @ApiProperty()
    code: string

    @Column({ nullable: true })
    @ApiProperty()
    resource: string

    @Column({ nullable: true })
    @ApiProperty()
    relationship: string

    @Column({ nullable: true })
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

    @CreateDateColumn({
        type: 'timestamptz',
    })
    createdAt: Date;

    @OneToMany(() => ManageContract, contract => contract.customers)
    contracts: ManageContract[]
}

