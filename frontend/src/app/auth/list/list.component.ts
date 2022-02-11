import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { UserI } from '../models/user.interfaces';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource  = [];
  users$: any = [];
  displayedColumns: string[] = ['id', 'username', 'role','actions'];
  constructor(private authSvc: AuthService) { }

  //from new user in process


  //get all users ok
  ngOnInit(): void {
    this.authSvc.getUsers().subscribe((res: any) => {
      this.dataSource = res
      console.log(this.users$);
    })
  }
//en proceso
  onEdit(id:string){
    
    Swal.fire(
      'Good job!',
      'You clicked the button!',


    )
  }
//ok
  onDelete(id:string):void{
    console.log(id);
    this.authSvc.delete(id).subscribe(res => {
      Swal.fire({
        icon: 'question',
        title: 'Desea eliminar el usuario? ',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
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
    });                      
  }


  //newUser






}
