import { IsNotEmpty, IsOptional, IsString, IsEnum, IsNumber, IsUrl, IsPositive } from 'class-validator';
import { CardType } from '../enums/CardType';
import { Class } from '../enums/Class';
import { Trait } from '../enums/Trait';
import { Rarity } from '../enums/Rarity';

export class CreateCardDto {
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(CardType)
  type?: CardType;

  @IsOptional()
  @IsEnum(Class)
  class?: Class;

  @IsOptional()
  @IsEnum(Trait)
  trait?: Trait;

  @IsOptional()
  @IsEnum(Rarity)
  rarity?: Rarity;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  cost: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  power?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  hp?: number;

  @IsOptional()
  @IsString()
  detail?: string;

  @IsOptional()
  @IsString()
  speech?: string;

  @IsNotEmpty()
  @IsNumber()
  setId: number;
}
