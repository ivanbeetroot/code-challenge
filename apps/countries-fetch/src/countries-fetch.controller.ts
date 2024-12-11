import { Controller, Get } from '@nestjs/common';
import { CountriesFetchService } from './countries-fetch.service';

@Controller()
export class CountriesFetchController {
  constructor(private readonly countriesFetchService: CountriesFetchService) {}

  @Get()
  getHello(): string {
    return this.countriesFetchService.getHello();
  }
}
