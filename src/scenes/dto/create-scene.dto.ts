import { IsString } from 'class-validator';

export class CreateSceneDto {
  @IsString()
  name: string;
}
