import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UserI, UserResponseI } from '../models/user.interfaces';
import { AuthService } from '../services/auth.service';
import { FormComponent } from './form/form.component';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {
  //data table
  dataSource = [];
  //stores user
  users$: any = [];
  user: Observable<UserI> | undefined;


  private subscription: Subscription = new Subscription;
  //columns table
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  constructor(
    private authSvc: AuthService,
    private matDialog: MatDialog,
    // public dialogRef: MatDialogRef<FormComponent>,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('cambio', changes);

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  //from ok 
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.matDialog.open(FormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      //evalua la respuesta desde el form
      //click en close no pasa por el if
      if (res) {
        this.onNewUser(res);
      }
    })
  }

  //get all users ok
  getUsers(): void {
    this.authSvc.getUsers().subscribe((res: any) => {
      this.dataSource = res
      console.log(this.users$);
    })
  }
 

  //in process falta implementar el edit & que el campo paswor no aparesca
  onEdit(id: string) {
   this.authSvc.getById(id).subscribe((res:any)=>{
    
     //create form & set param
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.data = { username: res.username, password: '123456', role: 'Reader' };
     const dialogRef = this.matDialog.open(FormComponent, dialogConfig);
     //respuesta del formulario
     dialogRef.afterClosed().subscribe(res => {
       console.log(res);
       //evalua la respuesta desde el form
       //click en close no pasa por el if
       if (res) {
 
       }
     })

   })
    
   
  }
  //ok
  onDelete(id: string): void {
    console.log(id);
      Swal.fire({
        icon: 'question',
        title: 'Desea eliminar el usuario? ',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.authSvc.delete(id).subscribe()
          Swal.fire({
            icon: 'success',
            title: 'El usuario se elimino correctamente',
            confirmButtonText: 'ok',
          }).then((result) => {
            if (result) {
              
              location.reload();
            }
          }, (err) => {

            Swal.fire('Error', 'No se puedo Eliminar contacto!!', 'error');

          })
        }
      });
   
  }

  //ok
  onNewUser(user: UserI) {
    this.subscription?.add(
      this.authSvc.newUser(user).subscribe(res => {
        console.log(res);
      })
    )
  }



}
