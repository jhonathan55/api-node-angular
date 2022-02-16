import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthInterceptorProvider } from '../interceptor/cookies.interceptor';
import { UserI } from '../models/user.interfaces';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
  
})
export class LoginComponent implements OnInit,OnDestroy {
  hide=true;
  private subscription: Subscription = new Subscription;
  
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    //Validators.pattern metodo de FormBuelder que valida con una expresion regular previamente creado
    username: [''],
    password: [''],
  });

  ngOnInit(): void {
    /* const userData = {
       username:'Felipe',
       password:"HolaMundo"
     }*/

    //this.authSvc.login(userData).subscribe(res=>console.log("login",res));
  }
  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
  }

  onLogin(): void {
    if(this.loginForm.invalid){
      return ;
    }
    const formValue = this.loginForm.value;
   
    this.subscription?.add(
        this.authSvc.login(formValue).subscribe(res => {
          if (res) {
            console.log(res);
            this.router.navigate(['./home']);
          }
        })
    );
  }



  //valida los input
  isValidField(field: string): string {
    const validatedField = this.loginForm.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }
}
