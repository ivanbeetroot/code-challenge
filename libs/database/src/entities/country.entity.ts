import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryTranslationEntity } from '@app/database/entities/country-translation.entity';

@Entity({ name: 'country' })
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column('text')
  @Index({ unique: true })
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  flag: Record<string, any>;

  @OneToMany(
    () => CountryTranslationEntity,
    (translation) => translation.country,
  )
  translations: CountryTranslationEntity[];
}
