import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';

const myModules = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatButtonModule
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
  ]
})
export class MaterialModule { }
