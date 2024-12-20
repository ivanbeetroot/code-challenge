import { Module } from '@nestjs/common';
import { CountriesApiController } from './countries-api.controller';
import { CountriesApiService } from './countries-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@app/database/database.config';
import { CountryEntity } from '@app/database/entities/country.entity';
import { DatabaseModule } from '@app/database';
import { AuthModule } from '@app/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: ['.env', '../../.env', '../../.env.dev', '../../../.env'],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([CountryEntity]),
    AuthModule,
  ],
  controllers: [CountriesApiController],
  providers: [CountriesApiService],
})
export class CountriesApiModule {}
