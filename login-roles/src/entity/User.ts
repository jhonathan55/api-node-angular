import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsEmail, IsOptional, isNotEmpty } from "class-validator";
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])

export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    //@IsEmail()
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    @IsOptional()
    @IsNotEmpty()
    resetToken:string;

    //metodos encripta el passwor 
    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    //
    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }
    
}
