import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number; 

    @OneToOne(() =>User, (user) =>user.profile, {
         onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
    })
    @JoinColumn()
    user_id : User;

    @Column({
        type : "text",
        nullable :false
    })
    bio : string;

    @Column({
        type : "varchar",
        length : 255,
        nullable : true
    })
    avatar :string;

    @Column({
        type : "timestamp",
        default : () => "CURRENT_TIMESTAMP"
    })
    created_at : Date;
}
