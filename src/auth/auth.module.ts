import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard'; // Import AuthGuard
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

import { Roles } from 'src/role/entity/role.entity';
import { JwtAdminStartegy } from './startegy/admin.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles]),
   
    ConfigModule, // Import ConfigModule for environment variables
    forwardRef(() => UsersModule), 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard,JwtAdminStartegy], // Provide AuthGuard
  exports: [AuthService, AuthGuard, JwtModule, JwtAdminStartegy], // Export AuthGuard and JwtModule
})
export class AuthModule {}
