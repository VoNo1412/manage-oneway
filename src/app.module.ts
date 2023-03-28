import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ManageCustomerModule } from './modules/manage-customer/manage-customer.module';
import { ManageContractModule } from './modules/manage-contract/manage-contract.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ManageCustomer } from './modules/manage-customer/entities/manage-customer.entity';
import { User } from './modules/user/entities/user.entity';
import { ManageContract } from './modules/manage-contract/entities/manage-contract.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1',
      database: 'base_nest',
      entities: [
          // __dirname + '/../**/*.entity{.ts,.js}',
          // User,
          // ManageCustomer,
          // ManageContract
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ManageCustomerModule,
    ManageContractModule
  ],
})
export class AppModule { }
