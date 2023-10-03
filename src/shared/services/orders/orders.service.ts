import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder } from '../../models';

@Injectable()
export class OrdersService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly orders = environment.api.endpoints.orders;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${ this.baseUrl }${ this.orders }`);
  }

  createOrder(order: IOrder): Observable<IOrder> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    return this.http.post<IOrder>(`${ this.baseUrl }${ this.orders }`, { ...order, id: this.generateOrderId() }, options);
  }

  private generateOrderId(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
