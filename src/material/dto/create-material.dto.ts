import { ApiProperty } from '@nestjs/swagger';
import { MaterialType } from '../entities/enum/material.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  path: string;
  @ApiProperty({ enum: ['Link'] })
  @IsEnum({ MaterialType, default: MaterialType.Link })
  type: MaterialType;
}
