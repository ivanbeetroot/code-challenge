import { Module } from '@nestjs/common';
import { CountriesFetchController } from './countries-fetch.controller';
import { CountriesFetchService } from './countries-fetch.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@app/database/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from '@app/database/entities/country.entity';
import { CountryTranslationEntity } from '@app/database/entities/country-translation.entity';
import { CountriesFetchCommand } from './countries-fetch.command';
import { CommandModule } from 'nestjs-command';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    CommandModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: ['.env', '../../.env'],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([CountryEntity, CountryTranslationEntity]),
  ],
  controllers: [CountriesFetchController],
  providers: [CountriesFetchService, CountriesFetchCommand],
})
export class CountriesFetchModule {}
