 
import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Roles } from './entity/role.entity'
import { RoleDto } from './dto/role.dto'
import { UpdateRoleDto } from './dto/update.role.dto'


@Injectable()
export class RoleService {
constructor(@InjectRepository(Roles)
private roleRepository: Repository<Roles>) { }
async create(createRoleDto: RoleDto) {
const role = createRoleDto.role
const roleExists = await this.roleRepository.findOne({ where: { role: ILike(role) } })
if (roleExists) {
throw new ConflictException("Role already exists ")
}
const newRole = this.roleRepository.create({ role })
return await this.roleRepository.save(newRole)
}


async findAll() {
return await this.roleRepository.find();
}



async update(id: number, updateRoleDto: UpdateRoleDto) {
const role = updateRoleDto.role
const roleExists = await this.roleRepository.findOne({ where: { role_id: id } })
if (!roleExists) {
throw new ConflictException("Role not found ")
}
// console.log("updaed value",updateRoleDto);


const updated = await this.roleRepository.update({ role_id: id }, { role: role })
// console.log(updated);


return this.roleRepository.findOne({ where: { role_id: id } })
}


async remove(id: number) {


await this.roleRepository.delete(id);
return {
message: 'Role deleted successfully.',
statusCode: HttpStatus.OK,
}


}
}

