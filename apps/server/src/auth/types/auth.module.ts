import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import googleOauthConfig from 'src/auth/config/google-oauth.config';
import { User } from 'src/user/entities/user.entity';
import { GoogleStrategy } from '../strategies/google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(googleOauthConfig),
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy],
})
export class AuthModule {}
