import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IWishlistItem } from '../../models';

@Injectable()
export class WishlistService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly wishList = environment.api.endpoints.wishList;

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<IWishlistItem[]> {
    return this.http.get<IWishlistItem[]>(`${this.baseUrl}${this.wishList}`);
  }

  addProductToWishlist(id: number): Observable<IWishlistItem> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    return this.http.post<IWishlistItem>(`${this.baseUrl}${this.wishList}`, { id }, options);
  }

  removeProductFromWishlistById(id: number): Observable<IWishlistItem> {
    return this.http.delete<IWishlistItem>(`${this.baseUrl}${this.wishList}/${id}`);
  }
}
