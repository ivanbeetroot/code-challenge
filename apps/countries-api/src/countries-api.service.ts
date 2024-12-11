import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from '@app/database/entities/country.entity';
import { Repository } from 'typeorm';
import { CountriesQueryDto } from './dto/countries-query.dto';

@Injectable()
export class CountriesApiService {
  constructor(
    @InjectRepository(CountryEntity)
    private countryEntityRepository: Repository<CountryEntity>,
  ) {}

  getCountriesList(
    query: CountriesQueryDto,
  ): Promise<[CountryEntity[], number]> {
    return this.countryEntityRepository.findAndCount({
      relations: ['translations'],
      take: query.take,
      skip: query.skip,
    });
  }
}
