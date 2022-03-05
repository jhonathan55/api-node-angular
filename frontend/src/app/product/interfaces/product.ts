export interface CategoryI {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updateAt: Date;
}

export interface ProductI {
    id: number;
    name: string;
    description: string;
    price:number;
    createdAt: Date;
    updateAt: Date;
    categories: CategoryI[];

}

export interface ResponseI{
    message: string,
    id?: number,
    status?:number
}
