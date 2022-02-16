import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { UserI, UserResponseI } from 'src/app/auth/models/user.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  hide = true;
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) { }

  newUserForm = this.fb.group({
    //Validators.pattern metodo de FormBuelder que valida con una expresion regular previamente creado
    username: [''],
    password: [''],
    role: ['']

  });

  private subscription: Subscription = new Subscription;

  ngOnInit(): void {
    // const userData = {
    //  username:'pru@gmail.com',
    //  password:"123456",
    //  role:"reader"
    // }
    // this.authSvc.newUser(userData).subscribe(res=>console.log('aqui',res));


  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onNewUser() {
    const newUser: UserI = this.newUserForm.value;
    if (this.newUserForm.valid) {
      this.subscription?.add(
        this.authSvc.newUser(newUser).subscribe(res=>{
          console.log(res);
          
        })

      )
         
         
    }
         
       
        
      
    
  }

    isValidField(field: string): string {
      const validatedField = this.newUserForm.get(field);
      return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
    }

  }
