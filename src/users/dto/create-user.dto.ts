import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, maxLength, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(255)
    username: string;

    @IsString()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsString()
    @MaxLength(255)
    password: string;

    @IsNumber()
    @IsNotEmpty()
    role : number;

}
