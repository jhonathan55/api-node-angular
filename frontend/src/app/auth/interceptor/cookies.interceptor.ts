import { Injectable } from '@angular/core';
import {
  HttpRequest,

  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,

} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';



@Injectable()
export class CookiesInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('auth')?.toString();
    //console.log('LLL', token)

    console.log(req);
    console.log('sqqw11111', token);
    if (token) {
      req = req.clone({
        headers: req.headers.set('auth', token)

      })
    }



    return next.handle(req);

  }

}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CookiesInterceptor,
  multi: true,
};
