import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PayPalModule } from './pay-pal/pay-pal.module';
import { AuthModule } from './auth/auth.module';
import { NewOrderModule } from './new_order/new_order.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AUTHAUTHOModule } from './auth_autho/auth.module';
import { UserModule } from './user/user.module';
import { ServicesListModule } from './services_list/services_list.module';
import { ManageUsersModule } from './manage-users/manage-users.module';
import { ManageProvidersModule } from './manage-providers/manage-providers.module';
import { BalanceUsersModule } from './balance_users/balance_users.module';
import { TechnicalSupportModule } from './technical_support/technical_support.module';
import { BlogModule } from './blog/blog.module';
import { ManagepagesModule } from './managepages/managepages.module';
import { ManagepannersModule } from './managepanners/managepanners.module';
import { ManagecoponsModule } from './managecopons/managecopons.module';
import { NotificationModule } from './notification/notification.module';
import { ResetpasswordModule } from './resetpassword/resetpassword.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MangePaymentsModule } from './mange-payments/mange-payments.module';
@Module({
  imports: [ConfigModule.forRoot(), ConfigModule.forRoot({
    isGlobal: true,
  })
    , MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }), MongooseModule.forRoot(process.env.MONGO || ''), PayPalModule, AuthModule, NewOrderModule, AUTHAUTHOModule, UserModule, ServicesListModule, ManageUsersModule, ManageProvidersModule, BalanceUsersModule, TechnicalSupportModule, BlogModule, ManagepagesModule, ManagepannersModule, ManagecoponsModule, NotificationModule, ResetpasswordModule, MangePaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
