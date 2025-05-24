import { IsString, Length } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  @Length(2, 20)
  name: string;
}
