import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from "typeorm"
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'manage-contract' })
export class ManageContract {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @ApiProperty()
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
    Cycle: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true
    })
    @ApiProperty()
    createdDate: Date
}
