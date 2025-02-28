import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { getUserId } from 'src/decorators/userID';
import { AuthGuard } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto: CreateLikeDto,  @getUserId() id: number) {
    return this.likesService.create(createLikeDto,id);
  }

  @Get('all')
  findAll() {
    return this.likesService.findAll();
  }

  @Get()
  findOne( @getUserId() id: number) {
    return this.likesService.findOne(id);
  }

  @Patch()
  update(@getUserId() id: number, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(id, updateLikeDto);
  }

  @Delete()
  remove(@getUserId() id: number) {
    return this.likesService.remove(id);
  }
}
