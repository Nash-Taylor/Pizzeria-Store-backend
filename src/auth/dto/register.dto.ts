import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Please enter a valid phone number (e.g., +1234567890 or 1234567890)'
  })
  phone: string;

  @IsString()
  @MinLength(5)
  address: string;
} 