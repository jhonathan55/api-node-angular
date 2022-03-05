import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ProductI } from '../interfaces/product';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,AfterViewInit {

  //data table
  dataSource: any;
  //colum table
  displayedColumns: string[] = ['id', 'name', 'description','price','actions'];

   //decorador que nos permite utilizar el paginator de material
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private productSvc:ProductService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator! = this.paginator;
  }

  ngOnInit(): void {
    this.getProducts();
    this.productSvc.getProduct().subscribe((res: ProductI[]) =>console.log(res))
    
  }

  getProducts():void{
    this.productSvc.getProduct().subscribe((res: ProductI[]) => {
      this.dataSource = new MatTableDataSource<ProductI>(res)
    })
  }
  //ok
  onDelete(id: string): void {
    console.log(id);
      Swal.fire({
        icon: 'question',
        title: 'Desea eliminar el Producto? ',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productSvc.delete(id).subscribe()
          Swal.fire({
            icon: 'success',
            title: 'El producto se elimino correctamente',
            confirmButtonText: 'ok',
          }).then((result) => {
            if (result) {
              location.reload();
            }
          }, (err) => {
            Swal.fire('Error', 'No se puedo Eliminar!!', 'error');
          })
        }
      });
   
  }
  

}
