import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {  Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CategoryI, ProductI } from '../interfaces/product';

import { ProductService } from '../services/product.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

  //data table
  dataSource: any;
  //colum table
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];

  //instancia de subcripcion 
  private subscription: Subscription = new Subscription;
  //decorador que nos permite utilizar el paginator de material
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productSvc: ProductService,
    private matDialog: MatDialog,
  ) { }
  ngOnInit(): void {
    this.getProducts();
    this.productSvc.getProduct().subscribe((res: ProductI[]) => console.log(res))
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator! = this.paginator;
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  getProducts(): void {
    this.productSvc.getProduct().subscribe((pro: ProductI[]) => {
      this.dataSource = new MatTableDataSource<ProductI>(pro),
      this.dataSource.paginator = this.paginator;
    })
  }
  //ok
  onDelete(id: string): void {
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
  onUpdate(id:string,product:ProductI){
    this.productSvc.edit(id,product).subscribe();
  }
  onEdit(id: string) {
    this.productSvc.getById(id).subscribe((res: any) => {
      //let cate almacenamos el id de la category
      let cateId=[]=res.categories.map((res:ProductI)=>res.id);
      console.log('product.categories', res.categories.map((res:ProductI)=>res.id));
      //create form & set param
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        name: res.name,
        description: res.description,
        price: res.price,
        categories: cateId,
      };
      const dialogRef = this.matDialog.open(FormComponent, dialogConfig);
      //respuesta del formulario
      dialogRef.afterClosed().subscribe((res:ProductI) => {
        console.log('respuesta del Dialog', res);
        //evalua la respuesta desde el form
        //click en close no pasa por el if
        console.log('product Edit',res);
        
        if (res) {
          this.onUpdate(id,res)
        }
      })

    })
  }
  //ok
  onNewProduct(product: ProductI) {
    this.subscription?.add(
      this.productSvc.new(product).subscribe()
    )
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
        this.onNewProduct(res);
      }
    })
  }


}
