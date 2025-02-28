import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleService } from 'src/role/role.service';
import { Roles } from 'src/role/entity/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Roles)
    private readonly roleRepository :Repository<Roles>
  ) { }

  async hashPassword(password: string): Promise<string> {
    const rounds = 10;
    const hashedPassword = await bcrypt.hash(password, rounds);
    return hashedPassword;
  }
  async create(createUserDto: CreateUserDto) {
    
    //check wheather the user Exist or not
    const userExist = await this.repository.findOne({
      where: { username: createUserDto.username },
    })
    
    if (userExist) {
      throw new NotFoundException("User Already Exist");
    }
    const role = await this.roleRepository.findOne({ where :{ role_id : createUserDto.role}})
    if(!role){
      throw new NotFoundException("Role Does Not Exist");
    }
    
    const hashed = await this.hashPassword(createUserDto.password);
    const create = await this.repository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashed,
      role : role
    });

    //save the user
    const user = await this.repository.save(create);
    return user;
  }

  async find(email: string, password: string) {
    const user = await this.repository.findOne({ where: { email } , relations : ['role']  });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new NotFoundException('Invalid credentials');
    }
    console.log("login successful");
    return user;
  }

  async findAll() {
    return await this.repository.find({relations : ['role']});
  }

  async findOne(id: number) {
    //check wheather the user Exist or not
    const userExist = await this.repository.findOne({
      where: { id }
    })

    if (userExist) {
      return userExist;
    }
    throw new NotFoundException("User Does Not Exist");
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    //check wheather the user Exist or not
    const userExist = await this.repository.findOne({
      where: { id }
    })
  const role = await this.roleRepository.findOne ({where : {role_id : updateUserDto.role}});
  if(!role){
    throw new NotFoundException("Role Does Not Exist");
  }
    if (userExist) {
      const hashed = await this.hashPassword(updateUserDto.password);
      const create = await this.repository.create({
        username: updateUserDto.username,
        email: updateUserDto.email,
        password: hashed,
        role : role
      });
      const updateUser = await this.repository.update(id, create);
      return updateUser;
    }
    throw new NotFoundException("User Does Not Exist");
  }


  async remove(id: number) {
    const userExist = await this.repository.findOne({
      where: { id }
    })

    if (userExist) {
      return this.repository.delete(id);
    }
    throw new NotFoundException("User Does Not Exist");
  }
}
