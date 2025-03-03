import { Module } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { TweetsController } from './tweets.controller';
import { Tweets } from './entities/tweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Roles } from 'src/role/entity/role.entity';
import { JwtAdminStartegy } from 'src/auth/startegy/admin.strategy';

@Module({
  imports: [UsersModule,TypeOrmModule.forFeature([Tweets]),TypeOrmModule.forFeature([Roles]),AuthModule],
  controllers: [TweetsController],
  providers: [TweetsService,JwtAdminStartegy],
  exports : [TweetsService, TypeOrmModule]
})
export class TweetsModule { }
