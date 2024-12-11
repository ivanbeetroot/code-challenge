import { Module } from '@nestjs/common';
import { CountriesFetchController } from './countries-fetch.controller';
import { CountriesFetchService } from './countries-fetch.service';

@Module({
  imports: [],
  controllers: [CountriesFetchController],
  providers: [CountriesFetchService],
})
export class CountriesFetchModule {}
