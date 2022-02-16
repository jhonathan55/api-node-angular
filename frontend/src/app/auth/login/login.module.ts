import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/modules/material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProvider } from '../interceptor/cookies.interceptor';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    HttpClientModule
      
  ],
  exports:[
    LoginComponent
  ],
  providers:[]
  
})
export class LoginModule { }
