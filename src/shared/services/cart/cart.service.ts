import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICartItem } from '../../models';

@Injectable()
export class CartService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly cart = environment.api.endpoints.cart;

  constructor(private http: HttpClient) {}

  getCart(): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>(`${this.baseUrl}${this.cart}`);
  }

  addProductToCart(id: number, amount: number): Observable<ICartItem> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    return this.http.post<ICartItem>(`${this.baseUrl}${this.cart}`, { id, amount }, options);
  }

  updateCart(id: number, amount: number): Observable<ICartItem> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    return this.http.put<ICartItem>(`${this.baseUrl}${this.cart}/${id}`, { amount }, options);
  }

  removeProductFromCartById(id: number): Observable<ICartItem> {
    return this.http.delete<ICartItem>(`${this.baseUrl}${this.cart}/${id}`);
  }

  clearCart(productIds: number[]): Observable<ICartItem[]> {
    return forkJoin(
      productIds.map((id: number) => this.removeProductFromCartById(id))
    );
  }
}
