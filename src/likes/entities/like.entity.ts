import { Tweets } from "src/tweets/entities/tweet.entity";
import { User } from "src/users/entities/user.entity";
import { 
   CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id : number;

   @ManyToOne(() => Tweets, (tweet) => tweet.likes, {
     onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
   })
   tweet_id : Tweets;

   @ManyToMany(() => User, (user) =>user.likes,{
     onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
   })
   user_id : User;

   @CreateDateColumn({
    type :"timestamp",
    default : () => "CURRENT_TIMESTAMP"
   })
   created_at : Date;

}
