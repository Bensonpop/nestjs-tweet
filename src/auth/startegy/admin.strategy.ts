import { CanActivate, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt"; 
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtAdminStartegy extends PassportStrategy(Strategy, "admin"){
    constructor (
        config : ConfigService,
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,

       
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload : any){
        
        if(!payload || payload.role.role !== "Admin"){
            throw new UnauthorizedException("Access denied1. Admins only.");
        }
         const user = await this.userRepository.findOne({
            where : {id : payload.id},
            relations : ['role']
         })
         
         if (!user || user.role.role_id !== payload.role.role_id) {
            throw new UnauthorizedException("Invalid admin credentials.");
          }
        
          return user;
    }

}