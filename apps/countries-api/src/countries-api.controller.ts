import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CountriesApiService } from './countries-api.service';
import { ApiOkResponsePaginated } from './swagger/api-ok-response-paginated';
import CountryListItemDTO from './dto/country-list-item.dto';
import { plainToInstance } from 'class-transformer';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
} from '@nestjs/swagger';
import { CountriesQueryDTO } from './dto/countries-query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/countries')
export class CountriesApiController {
  constructor(private readonly countriesApiService: CountriesApiService) {}

  //health check
  @Get('health')
  @ApiExcludeEndpoint()
  async healthCheck() {
    return { status: 'ok' };
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponsePaginated(CountryListItemDTO)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all validation rules' })
  async getCountries(
    @Query(new ValidationPipe({ transform: true })) query: CountriesQueryDTO,
  ) {
    const [countriesList, totalCount] =
      await this.countriesApiService.getCountriesList(query);
    return {
      data: countriesList.map((country) =>
        plainToInstance(CountryListItemDTO, country),
      ),
      totalCount,
      skip: query.skip,
      take: query.take,
    };
  }
}
