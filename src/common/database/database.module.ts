import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ManageContract } from 'src/modules/manage-contract/entities/manage-contract.entity';
import { ManageCustomer } from 'src/modules/manage-customer/entities/manage-customer.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return ({
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    entities: [
                        User,
                        ManageContract,
                        ManageCustomer
                    ],
                    synchronize: true,
                })
            }
        }),
    ],
})
export class DatabaseModule { }