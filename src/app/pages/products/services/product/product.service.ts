import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/shared/models';

@Injectable()
export class ProductService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly products = environment.api.endpoints.products;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}${this.products}`);
  }
}
