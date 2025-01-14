import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) { }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const newGame = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(newGame);
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['sets'] });
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['sets'],
    });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.gameRepository.preload({
      id,
      ...updateGameDto,
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return this.gameRepository.save(game);
  }

  async remove(id: number): Promise<void> {
    const result = await this.gameRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
  }
}
