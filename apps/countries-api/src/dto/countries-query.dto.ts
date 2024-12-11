import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class CountriesQueryDto {
  @ApiProperty({
    example: 0,
  })
  @IsInt()
  @Transform((value) => parseInt(value.value, 10))
  skip: number = 0;
  @ApiProperty({
    example: 10,
  })
  @Max(100)
  @IsInt()
  @Transform((value) => parseInt(value.value, 10))
  take: number = 10;
}
