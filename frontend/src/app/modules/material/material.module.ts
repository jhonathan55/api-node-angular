import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { AuthInterceptorProvider } from 'src/app/auth/interceptor/cookies.interceptor';
import { AuthService } from 'src/app/auth/services/auth.service';
import {MatTableModule} from '@angular/material/table';
const myModules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule
];
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    myModules,
  ],
  exports: [
    myModules
  ],
  providers:[]
})
export class MaterialModule { }
