import { Module } from '@nestjs/common';
import { CountriesApiController } from './countries-api.controller';
import { CountriesApiService } from './countries-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig, { DatabaseConfig } from '@app/database/database.config';
import { CountryEntity } from '@app/database/entities/country.entity';
import { CountryTranslationEntity } from '@app/database/entities/country-translation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: ['.env', '../../.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<DatabaseConfig>('database'),
        type: 'postgres',
        entities: [CountryEntity, CountryTranslationEntity],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CountriesApiController],
  providers: [CountriesApiService],
})
export class CountriesApiModule {}
