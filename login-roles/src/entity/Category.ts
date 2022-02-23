import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { MinLength, IsNotEmpty, IsOptional } from "class-validator";

@Entity()
@Unique(['name'])

export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(4)
    @IsNotEmpty()
    name: string;

    @Column()
    @MinLength(6)
    @IsOptional()
    description: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
  
}
