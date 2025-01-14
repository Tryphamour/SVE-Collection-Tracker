import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from '../../card/entities/card.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Set {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Card, (card) => card.set)
  cards: Card[];

  @ManyToOne(() => Game, (game) => game.sets, { nullable: false })
  game: Game;
}
