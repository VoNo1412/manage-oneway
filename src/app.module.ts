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
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    DatabaseModule,
    UserModule,
    ManageCustomerModule,
    ManageContractModule,
    TransporterModule,
    AuthModule
  ],
})
export class AppModule { }
