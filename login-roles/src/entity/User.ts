import {Entity, PrimaryGeneratedColumn, Column, Unique,CreateDateColumn,UpdateDateColumn} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail } from "class-validator";
//todo is Email
@Entity()
@Unique(['username'])

export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    username:string;

    @Column()
    @MinLength(6)
    password:string;

    @Column()
    @IsNotEmpty()
    role:string;

    @Column()
    @CreateDateColumn()
    createdAt:Date;

    @Column()
    @UpdateDateColumn()
    updateAt:Date;

    //metodos

}
