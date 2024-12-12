import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import TranslationDTO from './translation.dto';

export default class CountryListItemDTO {
  @Exclude()
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: TranslationDTO,
    isArray: true,
  })
  translations: TranslationDTO[];
}
