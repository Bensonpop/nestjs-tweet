import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { UpdateRoleDto } from './dto/update.role.dto';
import { RoleDto } from './dto/role.dto';

@Controller('role')
export class RoleController {
    constructor (private readonly roleService : RoleService){}

    @Post()
    create(@Body() createRoleDto: RoleDto) {
      return this.roleService.create(createRoleDto);
    }
  
  
    @Get()
    findAll() {
      return this.roleService.findAll();
    }
  
  
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.roleService.findOne(+id);
    // }
  
  
  
    @Patch(':id')
    update(@Param('id') id:number, @Body() updateRoleDto: UpdateRoleDto) {
      return this.roleService.update(id, updateRoleDto);
    }
  
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.roleService.remove(+id);
    }
}
