import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { TweetsModule } from './tweets/tweets.module';
import { LikesModule } from './likes/likes.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './typeOrmConfig ';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule,AuthModule],
      inject : [ConfigService],
      useFactory : async(configService :ConfigService) =>typeOrmConfig(configService),
    }),
    ProfilesModule, TweetsModule, LikesModule, UsersModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
