export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface UserI{
    username:string,
    password:string,
}

export interface UserResponseI{
    message:string,
    token:string,
    id:number,
    role:Roles
}