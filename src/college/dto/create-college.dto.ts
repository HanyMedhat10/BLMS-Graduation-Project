import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCollegeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsEmail()
  DeanOfCollege: string;
}
