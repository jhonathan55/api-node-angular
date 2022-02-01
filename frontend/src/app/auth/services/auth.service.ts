import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Roles, UserI, UserResponseI } from '../models/user.interfaces';
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
  private role = new BehaviorSubject<Roles>(null);

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

  get isAdmin$():Observable<any>{
    return this.role.asObservable();
  }

  login(authData: UserI): Observable<UserResponseI | void> {
    return this.http.post<UserResponseI>(`${environment.api_url}/auth/login`, authData).pipe(
      map((user: UserResponseI) => {
        this.saveLocalStorage(user);
        this.loggedIn.next(true);
        this.role.next(user.role)
        return user;
      }),
      catchError((err) => this.handlerError(err))
    );

  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['./login'])
  }

  private checkToke(): void {
    const user = localStorage.getItem('user')||null;
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
    localStorage.setItem('user', JSON.stringify(rest));
    console.log(rest);
    
  }
  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage)
  }
}
