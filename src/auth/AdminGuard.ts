import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@Injectable()
export class AdminGuard extends AuthGuard('admin') { 
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    
    if (!user || user.role.role !==  "Admin") {
        
      throw new UnauthorizedException("Access denied. Admins only.");
    }

    return true;
  }
}
