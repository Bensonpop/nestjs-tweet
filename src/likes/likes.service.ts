import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tweets } from 'src/tweets/entities/tweet.entity';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {

  constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    
        @InjectRepository(Tweets)
        private readonly tweetRepository: Repository<Tweets>,

        @InjectRepository(Tweets)
        private readonly likeRepository: Repository<Like>
      ) { }
  async create(createLikeDto: CreateLikeDto, id: number) {
   
    const userid = await this.userRepository.findOne({where : {id :id}})
    const tweetid = await this.tweetRepository.findOne({where : {id : createLikeDto.tweetid}})
    
    if(userid || tweetid){
     const create = await this.likeRepository.save({
      user_id :userid,
      tweet_id : tweetid
    });
    
    return create;
    }
    throw new NotFoundException("You Cannot like this Post")
  }

  async findAll() {
    return await this.likeRepository.find();
  }

  async findOne(id: number) {
    const like = await this.likeRepository.findOne({where :{id}});
    if(like ){
      return like;
    }
    throw new NotFoundException("No Post Exist to like")
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

   async remove(id: number) {
    const like = await this.likeRepository.findOne({where :{id}});
    if(like ){
      return await this.likeRepository.delete(id);
    }
    throw new NotFoundException("No Post Exist to like")
  }
}
