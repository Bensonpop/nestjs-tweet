import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Tweets } from './entities/tweet.entity';
import { NotFoundError } from 'rxjs';
import { getUserId } from 'src/decorators/userID';

@Injectable()
export class TweetsService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  
      @InjectRepository(Tweets)
      private readonly tweetRepository: Repository<Tweets>
    ) { }
 async create(createTweetDto: CreateTweetDto , @getUserId() id: number) {
    const userExist = await this.userRepository.findOne({where :{ id}});
    if(!userExist){
      throw new NotFoundException("User Not Exist");
    }
    const createTweet = await this.tweetRepository.save(createTweetDto);
    return createTweet;
  }

  async findAll() {
    return await this.tweetRepository.find();
  }

  async findOne(id: number) {
    const userExist = await this.userRepository.findOne({where :{ id}});
   const tweetExist = await this.tweetRepository.findOne({where :{id}});
   if (tweetExist){
    return tweetExist;
   }
   throw new NotFoundException("Tweet Not Exist")
  }

  async update(id: number, updateTweetDto: UpdateTweetDto) {
    const tweetExist = await this.tweetRepository.findOne({where :{id}});
   if (!tweetExist){
    throw new NotFoundException("Tweet Not Exist")
   }
   const updateTweet = await this.tweetRepository.update(id, {
    content : updateTweetDto.content
   });
   return updateTweet;
  }

  async remove(id: number) {
    const tweetExist = await this.tweetRepository.findOne({where :{id}});
    if (tweetExist){
      return await this.tweetRepository.delete(id);
     }
     throw new NotFoundException("Tweet Not Exist")
  }
}
