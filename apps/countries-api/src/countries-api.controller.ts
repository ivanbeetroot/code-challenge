import { Controller, Get } from '@nestjs/common';
import { CountriesApiService } from './countries-api.service';

@Controller()
export class CountriesApiController {
  constructor(private readonly countriesApiService: CountriesApiService) {}

  @Get()
  getHello(): string {
    return this.countriesApiService.getHello();
  }
}
