export type Roles = 'SUSCRIPTOR' | 'ADMIN' | null;

export interface UserI{
    username:string,
    password:string,
}

export interface UserResponseI extends UserI{
    message:string,
    token:string,
    id:number,
    role:Roles
}