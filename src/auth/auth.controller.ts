import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signDto } from './dto/sign.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authservice : AuthService){}
    
    
    @Post('login')
async signIn( @Body() signDTO:signDto ){
         
        const token = await this.authservice.singIn(signDTO.email, signDTO.password);  
        return {
            statusCode: HttpStatus.OK,
            message: 'Logged In Successfully',
            accessToken: token
        };
;    }
}
