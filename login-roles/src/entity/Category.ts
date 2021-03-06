import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
import { MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { Product } from "./Product";

@Entity()
@Unique(['id'])

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

    //Create relations category by product
    @ManyToMany(() => Product,(product)=>product.id)
    product: Product[];
  
}
