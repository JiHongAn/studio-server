import { IsString } from 'class-validator';

export class CreateObjectDto {
  @IsString()
  type: string;
}
