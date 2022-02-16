import { Component, OnInit, Inject, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import {
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Subscription } from 'rxjs';
import { UserI } from '../../models/user.interfaces';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit,OnChanges {
 
  description= 'New user'
  //view password
  hide = true;
  
  private subscription: Subscription = new Subscription;

  form = this.fb.group({
    //Validators.pattern metodo de FormBuelder que valida con una expresion regular previamente creado
    username: [''],
    password: [''],
    role: ['']
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    private authSvc: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
   
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('cam',changes);
  }
  ngOnInit(): void {
    this.initForm(this.data)
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  close() {
    this.dialogRef.close(false);
    this.form.reset();
  }
  //valid input text
  isValidField(field: string): string {
    const validatedField = this.form.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
  }

  initForm(data:UserI){
    console.log(data.username);
    
    this.form.patchValue({
      username:data.username,
      role:data.role
    })
  }
}
