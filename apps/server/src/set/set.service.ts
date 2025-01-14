import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSetDto } from './dto/create-set.dto';
import { UpdateSetDto } from './dto/update-set.dto';
import { Set } from './entities/set.entity';

@Injectable()
export class SetService {
  constructor(
    @InjectRepository(Set)
    private readonly setRepository: Repository<Set>,
  ) { }

  async create(createSetDto: CreateSetDto): Promise<Set> {
    const newSet = this.setRepository.create(createSetDto);
    return this.setRepository.save(newSet);
  }

  async findAll(): Promise<Set[]> {
    return this.setRepository.find({ relations: ['game', 'cards'] });
  }

  async findOne(id: number): Promise<Set> {
    const set = await this.setRepository.findOne({
      where: { id },
      relations: ['game', 'cards'],
    });
    if (!set) {
      throw new NotFoundException(`Set with ID ${id} not found`);
    }
    return set;
  }

  async update(id: number, updateSetDto: UpdateSetDto): Promise<Set> {
    const set = await this.setRepository.preload({
      id,
      ...updateSetDto,
    });

    if (!set) {
      throw new NotFoundException(`Set with ID ${id} not found`);
    }

    return this.setRepository.save(set);
  }

  async remove(id: number): Promise<void> {
    const result = await this.setRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Set with ID ${id} not found`);
    }
  }
}
