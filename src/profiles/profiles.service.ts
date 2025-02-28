import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) { }
  async create(createProfileDto: CreateProfileDto,id, imageUrl) {
    // Check if the user exists
    const userExist = await this.userRepository.findOne({
        where: { id: id }
    });


    if (!userExist) {
        throw new NotFoundException("User Does Not Exist");
    }
    
    // Check if profile already exists for the user
    const existingProfile = await this.profileRepository.findOne({
        where: { user_id: { id: userExist.id } } // ✅ Corrected
    });


    if (existingProfile) {
        throw new NotFoundException("Profile Already Exists");
    }

    // Create and save the new profile
    const createProfile = this.profileRepository.create({
        user_id: userExist, // ✅ Corrected - Directly assign user entity
        bio: createProfileDto.bio,
        avatar: imageUrl
    });

    return await this.profileRepository.save(createProfile);
}


 async findAll() {
  return await this.profileRepository.find({relations : ['user_id']});
}

async findOne(id: number) {
  const user = await this.userRepository.findOne({where : {id : id}});
  
  const profileExist = await this.profileRepository.findOne({
    where: { user_id : {id : user.id} }  ,
    relations : ['user_id']
  });
  
  if (profileExist){
    return profileExist;
  }
  throw new NotFoundException("Profile Not Exist");
}

async update(id: number, updateProfileDto: UpdateProfileDto, imageUrl?: string) {
  const user = await this.userRepository.findOne({where : {id : id}});
  
  const profileExist = await this.profileRepository.findOne({
    where: { user_id : {id : user.id} }  ,
    relations : ['user_id']
  });

  if (!profileExist) {
    throw new NotFoundException('Profile Not Exist');
  }

  // Construct updated data
  const updateData: Partial<Profile> = {
    bio: updateProfileDto.bio || profileExist.bio,
    avatar: imageUrl || profileExist.avatar
  };

  await this.profileRepository.update(id, updateData);
  return { message: 'Profile updated successfully' };
}
async remove(id: number) {
  const user = await this.userRepository.findOne({where : {id : id}});

  
  const profileExist = await this.profileRepository.findOne({
    where: { user_id : {id : user.id} }  ,
    relations : ['user_id']
  });

  
  if (profileExist){
    const deleteProfile = await this.profileRepository.delete(id);
    return deleteProfile;
  }
  throw new NotFoundException("Profile Not Exist");
}
}
