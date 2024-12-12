import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from '@app/database/entities/country.entity';
import { ILike, Repository } from 'typeorm';
import { CountriesQueryDTO } from './dto/countries-query.dto';

@Injectable()
export class CountriesApiService {
  constructor(
    @InjectRepository(CountryEntity)
    private countryEntityRepository: Repository<CountryEntity>,
  ) {}

  getCountriesList(
    query: CountriesQueryDTO,
  ): Promise<[CountryEntity[], number]> {
    return this.countryEntityRepository.findAndCount({
      relations: ['translations'],
      take: query.take,
      skip: query.skip,
      where: {
        name: query.name?.length ? ILike(`%${query.name}%`) : undefined,
      },
    });
  }
}
