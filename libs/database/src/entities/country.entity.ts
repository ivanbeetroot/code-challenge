import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CountryTranslationEntity } from '@app/database/entities/country-translation.entity';

@Entity({ name: 'country' })
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column('text')
  name: string;

  @Column('text')
  flag: string;

  @OneToMany(
    () => CountryTranslationEntity,
    (translation) => translation.country,
  )
  translations: CountryTranslationEntity[];
}
