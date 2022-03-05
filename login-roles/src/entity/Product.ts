import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { Category } from "./Category";

@Entity()
@Unique(['name'])

export class Product {

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
    @MinLength(3)
    @IsNotEmpty()
    price: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    //Create relations product by category
    @ManyToMany(() => Category,(category)=>category.id)
    @IsNotEmpty()
    @JoinTable()
    categories: Category[];
  
}
