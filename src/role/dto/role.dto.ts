import { IsEmpty, IsString } from "class-validator";

export class RoleDto { 
    @IsEmpty()
    @IsString()
    role : string;
}