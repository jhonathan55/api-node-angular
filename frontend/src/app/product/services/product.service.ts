import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductI, ResponseI } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<ProductI[]> | undefined;
  constructor(
    private http:HttpClient
  ) { }
  //ok
  getProduct(): Observable<ProductI[]> {
    this.products$ = this.http.get<ProductI[]>(`${environment.api_url}/product`)
    return this.products$
  }

  delete(id: string): Observable<ResponseI | void> {
    return this.http.delete<ResponseI>(`${environment.api_url}/product/${id}`).pipe(
      map((user) => {
        console.log(user);
      })
    )
  }
  
}
