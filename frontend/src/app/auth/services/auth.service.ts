import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roles, UserI, UserResponseI } from '../models/user.interfaces';
import { catchError, map } from 'rxjs/operators';

//helper
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Roles>(null);
 
  users:Observable<UserI>| undefined;

  get token(){
    return localStorage.getItem('auth')
  }
  //cont token que se guarda en la app con el nombre profanis_auth
  private readonly TOKEN_NAME = 'auth';


  constructor(
    //el Http tambien se debe importar en el modulo raiz
    private http: HttpClient,
    private router: Router
  ) {
    this.checkToke();
    
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<any> {
    return this.role.asObservable();
  }

  login(authData: UserI): Observable<UserResponseI | void> {
    return this.http.post<UserResponseI>(`${environment.api_url}/auth/login`, authData).pipe(
      map((user: UserResponseI) => {
        this.saveLocalStorage(user);
        this.loggedIn.next(true);
        return user;
      }),
      catchError((err) => this.handlerError(err))
    );

  }

  getUsers():Observable<UserI>{
      this.users=this.http.get<UserI>(`${environment.api_url}/user`)
    return this.users
  }
  newUser(authData: UserI): Observable<UserResponseI | void> {
      
    return this.http.post<UserResponseI>(`${environment.api_url}/user`, authData).pipe(
      map((res)=>{
       return res
      }),
      catchError((err)=>this.handlerError(err)
      
      )
    )
  }
  delete(id:string): Observable<UserResponseI | void>{
   return this.http.delete<UserResponseI>(`${environment.api_url}/user/${id}`).pipe(
     map((user)=>{
       console.log(user);
     })
   )
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');

    this.loggedIn.next(false);
    this.router.navigate(['./login'])
  }

  private checkToke(): void {
    const user = localStorage.getItem('user') || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user);
      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
      }
    }
    //set userIsLogged= isExpired
  }
  //guarda la respuesta del back en la app web en formato json
  private saveLocalStorage(user: UserResponseI): void {

    const { message, ...rest } = user;
    
    //almacena los datos del usuario en la app
    localStorage.setItem('user', JSON.stringify(rest));
    //almacena el token en la const TOKEN_NAME y quitamos las comillas para que no cree conflicto en el back al momento de validad el token
    localStorage.setItem(this.TOKEN_NAME, JSON.stringify(rest.token).replace(/["']/g, ""));
    // console.log(this.token$);
    console.log(this.token);
  }
  private handlerError(err: any): Observable<never> {
    //let errorMessage = 'An error ocurred retrienving data';

    if (err.status==400) {
      Swal.fire(
        'Error!',
        'Complete todos los campos!',
        'error'
      )
     
    }if(err.status==409){
      Swal.fire(
        'Error!',
        'Usuario ya existe!',
        'error'
      )
    }if(err.status==200){
      Swal.fire(
        'succefull!',
        'success'
      )
      return throwError(err)
    }if(err.status==404){
      Swal.fire(
        'Error!',
        'no encontrado',
        'error'
      )
    }
    if(err.status==452){
      Swal.fire(
        'Error!',
        'Datos incorreectos',
        'error'
      )
    }


    
    //window.alert(errorMessage);
    return throwError(err)
  }


}
