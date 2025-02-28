import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [RoleModule,TypeOrmModule.forFeature([User]),AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports : [UsersService , TypeOrmModule]
})
export class UsersModule {}
