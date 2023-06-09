import { ApiProperty } from '@nestjs/swagger';
import { ManageCustomer } from 'src/modules/manage-customer/entities/manage-customer.entity';
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'manage-contract' })
export class ManageContract {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    @ApiProperty()
    codeNumber: string;

    @Column({ nullable: true })
    @ApiProperty()
    nameBuyer: string;

    @Column({ nullable: true })
    @ApiProperty()
    nameBenifit: string;

    @Column({ nullable: true })
    @ApiProperty()
    valueContract: string;

    @Column({ nullable: true })
    @ApiProperty()
    effectDate: string;

    @Column({ nullable: true })
    @ApiProperty()
    paymentYear: string;

    @Column({ nullable: true })
    @ApiProperty()
    cycle: string;

    @Column({
        type: 'date',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true
    })
    @ApiProperty()
    createdDate: Date

    @ManyToOne(() => ManageCustomer, customer => customer.contracts, { onDelete: 'CASCADE' })
    @JoinColumn()
    customers: ManageCustomer
}
