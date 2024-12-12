import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CountriesQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value) => value.value?.trim())
  @MinLength(3)
  name?: string;

  @ApiPropertyOptional({
    example: 0,
  })
  @IsInt()
  @Transform((value) => parseInt(value.value, 10) || 0)
  @IsOptional()
  skip: number = 0;
  @ApiPropertyOptional({
    example: 10,
  })
  @Max(100)
  @IsInt()
  @IsOptional()
  @Transform((value) => parseInt(value.value, 10) || 100)
  take: number = 10;
}
