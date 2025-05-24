import { IsString, Length } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @Length(2, 20)
  name: string;
}
