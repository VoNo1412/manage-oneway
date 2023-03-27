import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ManageCustomerModule } from './modules/manage-customer/manage-customer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vono:1412@cluster0.rxvgowx.mongodb.net/?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    ManageCustomerModule
  ],
})
export class AppModule { }
