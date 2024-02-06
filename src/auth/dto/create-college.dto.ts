import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCollege {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  DeanOfCollege: string;
}
