import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../models';

@Injectable()
export class ProductService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly products = environment.api.endpoints.products;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}${this.products}`).pipe(delay(1000));
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}${this.products}/${productId}`);
  }
}
