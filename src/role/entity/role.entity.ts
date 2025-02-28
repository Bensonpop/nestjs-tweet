import { IsEmpty, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Roles{
    @PrimaryGeneratedColumn()
    role_id : number;

   @Column({
    nullable : false,
    type  : "varchar",
    length : 50
   })
    role :  string;

    @OneToMany(() =>User, (user) => user.role)
    userid : User[];
}