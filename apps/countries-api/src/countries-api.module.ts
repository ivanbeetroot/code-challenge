import { Module } from '@nestjs/common';
import { CountriesApiController } from './countries-api.controller';
import { CountriesApiService } from './countries-api.service';

@Module({
  imports: [],
  controllers: [CountriesApiController],
  providers: [CountriesApiService],
})
export class CountriesApiModule {}
