import { Like } from "src/likes/entities/like.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tweets {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        type : "text",
        nullable : true
    })
    content : string;

   @ManyToOne(() => User, (user) =>user.id,{
    onDelete : "CASCADE",
    onUpdate : "CASCADE"
   })
   user_id : User;

    @CreateDateColumn({
        type : "time",
        default : () => "CURRENT_TIMESTAMP"
    })
    created_at : Date;

    @OneToMany(() =>Like , (like) => like.tweet_id,)
    likes : Like[];

}
