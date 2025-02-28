import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { UsersModule } from 'src/users/users.module';
import { TweetsModule } from 'src/tweets/tweets.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [ UsersModule, TweetsModule,TypeOrmModule.forFeature([Like]),AuthModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
