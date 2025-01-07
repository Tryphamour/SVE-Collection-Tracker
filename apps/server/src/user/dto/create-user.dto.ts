import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  username: string;

  avatarUrl: string;

  password: string;
}
