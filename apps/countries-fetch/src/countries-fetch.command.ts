import { Injectable, Logger } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { CountriesFetchService } from './countries-fetch.service';

@Injectable()
export class CountriesFetchCommand {
  private readonly logger = new Logger(CountriesFetchCommand.name);
  constructor(private readonly countriesFetchService: CountriesFetchService) {}

  @Command({
    command: 'countries:fetch',
    describe: 'Fetch countries from the API',
  })
  async fetchCountries() {
    this.logger.verbose('Fetching countries...');
    await this.countriesFetchService.fetchCountries();
  }
}
