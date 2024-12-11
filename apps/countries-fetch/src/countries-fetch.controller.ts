import { Controller } from '@nestjs/common';
import { CountriesFetchService } from './countries-fetch.service';

@Controller()
export class CountriesFetchController {
  constructor(private readonly countriesFetchService: CountriesFetchService) {}
}
