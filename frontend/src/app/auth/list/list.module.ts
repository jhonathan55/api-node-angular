import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MaterialModule
  ],
  entryComponents:[FormComponent],
})
export class ListModule { }
