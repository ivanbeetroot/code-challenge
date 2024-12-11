import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CountriesApiService } from './countries-api.service';
import { ApiOkResponsePaginated } from './swagger/api-ok-response-paginated';
import CountryListItemDto from './dto/country-list-item.dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CountriesQueryDto } from './dto/countries-query.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/countries')
export class CountriesApiController {
  constructor(private readonly countriesApiService: CountriesApiService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponsePaginated(CountryListItemDto)
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all validation rules' })
  async getCountries(
    @Query(new ValidationPipe({ transform: true })) query: CountriesQueryDto,
  ) {
    const [countriesList, totalCount] =
      await this.countriesApiService.getCountriesList(query);
    return {
      data: countriesList.map((country) =>
        plainToInstance(CountryListItemDto, country),
      ),
      totalCount,
      skip: query.skip,
      take: query.take,
    };
  }
}
