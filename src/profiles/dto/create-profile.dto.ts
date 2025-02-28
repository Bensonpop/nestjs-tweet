import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProfileDto {
    

    @IsString()
    @IsNotEmpty()
    bio: string;

    @IsString()
    @IsNotEmpty()
    avatar: string;

}
