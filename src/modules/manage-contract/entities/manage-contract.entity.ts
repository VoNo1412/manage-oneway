import { ApiProperty } from '@nestjs/swagger';
import { ManageCustomer } from 'src/modules/manage-customer/entities/manage-customer.entity';
import { Entity, Column, ManyToMany, ManyToOne, JoinColumn } from "typeorm"
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'manage-contract' })
export class ManageContract {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @ApiProperty(
        {
            name: 'this is code"s customer',
            description: 'diff between customer',
            example: 'vono1412'
        }
    )
    codeNumber: string;

    @Column()
    @ApiProperty()
    nameBuyer: string;

    @Column()
    @ApiProperty()
    nameBenifit: string;

    @Column()
    @ApiProperty()
    valueContract: string;

    @Column()
    @ApiProperty()
    effectDate: string;

    @Column()
    @ApiProperty()
    paymentYear: string;

    @Column()
    @ApiProperty()
    cycle: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true
    })
    @ApiProperty()
    createdDate: Date

    @ManyToOne(() => ManageCustomer, customer => customer.contracts, { onDelete: 'CASCADE' })
    @JoinColumn()
    customers: ManageCustomer
}
