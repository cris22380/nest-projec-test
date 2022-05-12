import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app/app.controller';
// import { AppService } from './app/app.service';
// import { UserController } from './modules/user/user.controller';
// import { UserService } from './modules/user/user.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/calcubox'),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
