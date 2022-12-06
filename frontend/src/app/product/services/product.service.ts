import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryI, ProductI, ResponseI } from '../interfaces/product';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<ProductI[]> | undefined;
  categories$: Observable<CategoryI[]> | undefined;
  constructor(
    private http:HttpClient
  ) { }
  //ok
  getProduct(): Observable<ProductI[]> {
    this.products$ = this.http.get<ProductI[]>(`${environment.api_url}/product`)
    return this.products$
  }
  //ok
  delete(id: string): Observable<ResponseI | void> {
    return this.http.delete<ResponseI>(`${environment.api_url}/product/${id}`).pipe(
      map((user) => {
        console.log(user);
      })
    )
  }
  //ok
  getById(id: string): Observable<ProductI | void> {
    return this.http.get<ProductI>(`${environment.api_url}/product/${id}`)
  }
  //process
  edit(id: string, product:ProductI):Observable<ProductI>{
    return this.http.patch<ProductI>(`${environment.api_url}/product/${id}`,product)
  }
  //ok
  new(productData: ProductI): Observable<ResponseI | void> {
    return this.http.post<ResponseI>(`${environment.api_url}/product`, productData).pipe(
      map((res) => {
        return res
      }),
      catchError((err) => this.handlerError(err)
      )
    )
  }
   //ok
   getCategories():Observable<CategoryI[]>{
    this.categories$ = this.http.get<CategoryI[]>(`${environment.api_url}/category`)
    return this.categories$
  }
  //captura los errores desde el servidor
  private handlerError(err: any): Observable<never> {
    //let errorMessage = 'An error ocurred retrienving data';
    if (err.status == 400) {
      Swal.fire(
        'Error!',
        'Complete todos los campos!',
        'error'
      )
    } if (err.status == 409) {
      Swal.fire(
        'Error!',
        'Producto ya existe!',
        'error'
      )
    } if (err.status == 200) {
      Swal.fire(
        'succefull!',
        'success'
      ).then((result) => {
        if (result) {
          location.reload();
        }
      }, (err) => {
        Swal.fire('Error', 'No se puedo Eliminar contacto!!', 'error');
      })

      return throwError(err)
    } if (err.status == 404) {
      Swal.fire(
        'Error!',
        'no encontrado',
        'error'
      )
    }
    if (err.status == 452) {
      Swal.fire(
        'Error!',
        'Datos incorreectos',
        'error'
      )
    }

    //window.alert(errorMessage);
    return throwError(err)
  }
  
}
