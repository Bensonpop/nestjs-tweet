import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class signDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
   email : string;

   @IsNotEmpty()
   @IsString()
   password : string;
}
    