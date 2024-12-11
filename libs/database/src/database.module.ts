import { Module } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '@app/database/database.config';
import { CountryEntity } from '@app/database/entities/country.entity';
import { CountryTranslationEntity } from '@app/database/entities/country-translation.entity';

@Module({
  imports: [
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
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
