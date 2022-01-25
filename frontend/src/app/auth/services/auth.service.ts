import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import {  BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserI, UserResponseI } from '../models/user.interfaces';
import { catchError, map } from 'rxjs/operators';

//helper
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    //el Http tambien se debe importar en el modulo raiz
    private http:HttpClient,
    private router:Router
  ) {
    this.checkToke();
   }

   get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
   }

  login(authData:UserI):Observable<UserResponseI | void>{
    return this.http.post<UserResponseI>(`${environment.api_url}/auth/login`,authData).pipe(
      map((res:UserResponseI)=>{
        this.saveToken(res.token);
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err)=> this.handlerError(err))
    );

  }

  logout():void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['./login'])
  }

  private checkToke():void{
    const userToken = localStorage.getItem('token');

    const isExpired= helper.isTokenExpired();
    console.log(isExpired);
    if(isExpired){
      this.logout();
    }else{
      this.loggedIn.next(true);
    }
    //set userIsLogged= isExpired
  }

  private saveToken(token:string):void{
    localStorage.setItem('token',token);
  }
  private handlerError(err:any):Observable<never>{
    let errorMessage= 'An error ocurred retrienving data';
    if(err){
      errorMessage=`Error: code ${err.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage)
  }
}
