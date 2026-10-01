import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateReservationDto {

  
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(1)
  people: number;
}
