import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { SetModule } from '../set/set.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    SetModule,
  ],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule { }
