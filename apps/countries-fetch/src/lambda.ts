import { Handler } from 'aws-lambda';
import { CountriesFetchModule } from './countries-fetch.module';
import { NestFactory } from '@nestjs/core';
import { CountriesFetchService } from './countries-fetch.service';
import { Logger } from '@nestjs/common';

const logger = new Logger('CountriesFetchLambda');

export const handler: Handler = async () => {
  try {
    logger.log('Fetching countries...');
    const appContext =
      await NestFactory.createApplicationContext(CountriesFetchModule);
    const countriesFetchService = appContext.get(CountriesFetchService);
    await countriesFetchService.fetchCountries();
    logger.log('Countries fetched successfully');
  } catch (e) {
    logger.error(e);
  }
};
