import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Set } from '../../set/entities/set.entity';
import { CardType } from '../enums/CardType';
import { Class } from '../enums/Class';
import { Trait } from '../enums/Trait';
import { Rarity } from '../enums/Rarity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  link: string;

  @Column({ nullable: false })
  imageUrl: string;

  @ManyToOne(() => Set, (set) => set.cards, { nullable: false })
  set: Set;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'enum', enum: CardType, nullable: true })
  type: CardType;

  @Column({ type: 'enum', enum: Class, nullable: true })
  class: Class;

  @Column({ type: 'enum', enum: Trait, nullable: true })
  trait: Trait;

  @Column({ type: 'enum', enum: Rarity, nullable: true })
  rarity: Rarity;

  @Column({ type: 'tinyint', unsigned: true, nullable: false })
  cost: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  power: number;

  @Column({ type: 'tinyint', unsigned: true, nullable: true })
  hp: number;

  @Column({ type: 'text', nullable: true })
  detail: string;

  @Column({ type: 'text', nullable: true })
  speech: string;
}
