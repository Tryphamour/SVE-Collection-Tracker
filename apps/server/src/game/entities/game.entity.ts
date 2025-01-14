import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Set } from '../../set/entities/set.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Set, (set) => set.game)
  sets: Set[];
}
