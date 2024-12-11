import { Module } from '@nestjs/common';
import { CountriesApiController } from './countries-api.controller';
import { CountriesApiService } from './countries-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@app/database/database.config';
import { CountryEntity } from '@app/database/entities/country.entity';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: ['.env', '../../.env'],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([CountryEntity]),
  ],
  controllers: [CountriesApiController],
  providers: [CountriesApiService],
})
export class CountriesApiModule {}
