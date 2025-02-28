import { profile } from "console";
import { Like } from "src/likes/entities/like.entity";
import { Profile } from "src/profiles/entities/profile.entity";
import { Roles} from "src/role/entity/role.entity";
import { Tweets } from "src/tweets/entities/tweet.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
        nullable: false
    })
    username: string;

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
        nullable: false
    })
    email: string;

    @Column({
        type: "varchar",
        length: 255,
        nullable: false
    })
    password: string;

    @CreateDateColumn({
        type: "timestamp",
        default :  () => "CURRENT_TIMESTAMP"
    })
    created_at : Date;

    @ManyToOne (() => Roles, (role) => role.userid)
    role : Roles;

    @OneToOne (() => Profile, (profile) => profile.user_id )
    @JoinColumn()
    profile : Profile;

    @OneToMany(() => Tweets, (tweet) => tweet.user_id )
    tweets : Tweets[];

    @ManyToMany(() =>Like ,(likes) => likes.user_id)
    likes : Like[];

   
}
