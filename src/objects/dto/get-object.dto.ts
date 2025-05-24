import { JsonValue } from '@prisma/client/runtime/library';
import { IsNumber, IsOptional } from 'class-validator';

export class GetObjectDto {
  @IsOptional()
  @IsNumber()
  sequence?: number;
}

export class GetObjectResponseDto {
  id: string;
  sceneId: string;
  sequence: number;
  type: string;
  props?: JsonValue;
}
