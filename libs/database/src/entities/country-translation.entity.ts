import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from '@app/database/entities/country.entity';

@Entity({ name: 'country_translation' })
export class CountryTranslationEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column('text')
  official: string;

  @Column('text')
  common: string;

  @Column({ length: 5 })
  language: string;

  @ManyToOne(() => CountryEntity, (country) => country.translations)
  @JoinColumn()
  country: CountryEntity;
}
