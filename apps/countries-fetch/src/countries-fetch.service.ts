import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from '@app/database/entities/country.entity';
import { Repository } from 'typeorm';
import CountryResponseItem from './interfaces/country-response-item';
import { CountryTranslationEntity } from '@app/database/entities/country-translation.entity';

@Injectable()
export class CountriesFetchService {
  private readonly logger = new Logger(CountriesFetchService.name);
  constructor(
    @InjectRepository(CountryEntity)
    private countryEntityRepository: Repository<CountryEntity>,
    @InjectRepository(CountryTranslationEntity)
    private countryTranslationEntityRepository: Repository<CountryTranslationEntity>,
  ) {}

  async fetchCountries() {
    const options: RequestInit = {
      redirect: 'follow',
      method: 'GET',
    };
    const countries: CountryResponseItem[] = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,translations,flags',
      options,
    ).then((response) => response.json());

    await Promise.allSettled(
      countries.map((country) => this.saveCountry(country)),
    );
  }

  private async saveCountry(country: CountryResponseItem) {
    const countryEntity = new CountryEntity();
    countryEntity.name = country.name.common;
    countryEntity.flag = country.flags.png;

    await this.countryEntityRepository.save(countryEntity);

    await Promise.all(
      Object.entries(country.translations).map(([key, value]) => {
        const countryTranslation = new CountryTranslationEntity();
        countryTranslation.official = value.official;
        countryTranslation.common = value.common;
        countryTranslation.language = key;
        countryTranslation.country = countryEntity;
        return this.countryTranslationEntityRepository.save(countryTranslation);
      }),
    );
  }
}
