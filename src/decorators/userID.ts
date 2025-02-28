import { createParamDecorator, ExecutionContext, UnauthorizedException ,} from "@nestjs/common";

export const getUserId = createParamDecorator(
    (_ , context: ExecutionContext) : number  =>{
        const req = context.switchToHttp().getRequest();
         const user = req.user;
         if(!user || !user.id){
            throw new UnauthorizedException("User ID Not Found in Token");
         }
         return user.id;
    }
)