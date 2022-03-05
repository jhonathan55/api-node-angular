import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog  } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UserI } from '../models/user.interfaces';
import { AuthService } from '../services/auth.service';
import { FormComponent } from './form/form.component';
import { catchError, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy, OnChanges,AfterViewInit  {
  //data table
  dataSource:any;
  //stores user
  users$: any = [];
  user: Observable<UserI> | undefined;

  private subscription: Subscription = new Subscription;
  //columns table
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  //decorador que nos permite utilizar el paginator de material
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private authSvc: AuthService,
    private matDialog: MatDialog, 
  ) { }
  ngOnInit(): void {
    this.getUsers();
 
  }
  //implementacion de la interfas AfterViewInit para la paginación
  ngAfterViewInit() {
    this.dataSource.paginator! = this.paginator;
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    console.log('cambio', changes);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  //form ok edit 
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
  //pasamos la respuesta del servidor al dataSource bajo una instancia MattableDataSource y la tipamos
  getUsers(): void {
    this.authSvc.getUsers().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<UserI>(res)
    })
  }
  //in process falta implementar el edit & que el campo paswor no aparesca
  onEdit(id: string) {
   this.authSvc.getById(id).subscribe((res:any)=>{
    
     //create form & set param
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.data = { username: res.username, password: '123456', role:res.role};
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
