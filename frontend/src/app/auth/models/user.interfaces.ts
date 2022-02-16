export type Roles = 'SUSCRIPTOR' | 'ADMIN' | null;

export interface UserI {
    id?: number;
    username?: string;
    password?: string;
    role?: string;
    createdAt?: Date;
    updateAt?: Date;
    resetToken?: string;

}


export interface UserResponseI extends UserI {
    message: string,
    token?: string,
    id?: number,
    status?:number
  
}