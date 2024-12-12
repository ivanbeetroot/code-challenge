import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export default class TranslationDTO {
  @Exclude()
  id: string;
  @ApiProperty()
  official: string;
  @ApiProperty()
  common: string;
  @ApiProperty()
  language: string;
}
