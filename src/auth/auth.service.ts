import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor (private readonly userService : UsersService,
        private readonly jwtService : JwtService
    ) {}

    async singIn(email : string , password : string) {
        const users = await this.userService.find(email ,password );
        const payload = {id: users.id, name :users.username , role : users.role};
        
        const accessToken = await this.jwtService.signAsync(payload);
       
        
        return accessToken;
    }
}
;