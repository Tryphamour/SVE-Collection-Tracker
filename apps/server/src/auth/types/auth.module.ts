import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import googleOauthConfig from 'src/auth/config/google-oauth.config';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from '../strategies/google.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(googleOauthConfig),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
