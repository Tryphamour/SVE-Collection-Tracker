import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import googleOauthConfig from 'src/auth/config/google-oauth.config';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt-config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(googleOauthConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy,
    RefreshStrategy,
    JwtStrategy,
    AuthService,
    JwtService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
