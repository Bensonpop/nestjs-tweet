import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { getUserId } from 'src/decorators/userID';
import { JwtAdminStartegy } from 'src/auth/startegy/Admin.strategy';
import { AdminGuard } from 'src/auth/AdminGuard';

@Controller('tweets')
@UseGuards(AuthGuard)
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  create( @getUserId() id: number,@Body() createTweetDto: CreateTweetDto) {
    return this.tweetsService.create(createTweetDto,id);
  }

  @UseGuards(AdminGuard)
  @Get('all')
  findAll() {
    return this.tweetsService.findAll();
  }

  @Get()
  findOne(@getUserId() id: number) {
    return this.tweetsService.findOne(id);
  }

  @Patch()
  update( @getUserId() id: number, @Body() updateTweetDto: UpdateTweetDto) {
    return this.tweetsService.update(id, updateTweetDto);
  }

  @Delete(':id')
  remove(@getUserId() id: number) {
    return this.tweetsService.remove(id);
  }
}
