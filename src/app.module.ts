import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ManageCustomerModule } from './modules/manage-customer/manage-customer.module';
import { ManageContractModule } from './modules/manage-contract/manage-contract.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ManageCustomer } from './modules/manage-customer/entities/manage-customer.entity';
import { User } from './modules/user/entities/user.entity';
import { ManageContract } from './modules/manage-contract/entities/manage-contract.entity';
import { TransporterModule } from './modules/transporters/transporters.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      // exclude: ['/api*'],
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'oneway',
      entities: [
          // __dirname + '/../**/*.entity{.ts,.js}',
          User,
          ManageCustomer,
          ManageContract
      ],
      synchronize: true,
      logging: true
    }),
    UserModule,
    ManageCustomerModule,
    ManageContractModule,
    TransporterModule,
    AuthModule
  ],
})
export class AppModule { }
