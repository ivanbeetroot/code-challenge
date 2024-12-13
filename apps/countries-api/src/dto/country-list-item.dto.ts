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
    type: 'object',
    additionalProperties: { type: 'string' },
    example: {
      alt: 'Alt text',
      png: 'https://flagcdn.com/w320/sb.png',
      svg: 'https://flagcdn.com/sb.svg',
    },
  })
  flag: Record<string, string>;

  @ApiProperty({
    type: TranslationDTO,
    isArray: true,
  })
  translations: TranslationDTO[];
}
