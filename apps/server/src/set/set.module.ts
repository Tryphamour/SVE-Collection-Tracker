import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';
import { SetService } from './set.service';
import { SetController } from './set.controller';
import { GameModule } from '../game/game.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Set]),
    GameModule,
  ],
  controllers: [SetController],
  providers: [SetService],
  exports: [SetService],
})
export class SetModule { }
