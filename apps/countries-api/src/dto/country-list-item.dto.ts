import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import TranslationDto from './translation.dto';

export default class CountryListItemDto {
  @Exclude()
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: TranslationDto,
    isArray: true,
  })
  translations: TranslationDto[];
}
