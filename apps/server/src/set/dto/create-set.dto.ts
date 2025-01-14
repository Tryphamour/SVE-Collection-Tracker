import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  gameId: number;
}
