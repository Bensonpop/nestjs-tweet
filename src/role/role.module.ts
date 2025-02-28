import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Roles } from './entity/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([Roles])],
  controllers: [RoleController],
  providers: [RoleService],
  exports : [RoleService,TypeOrmModule]
})
export class RoleModule {}
