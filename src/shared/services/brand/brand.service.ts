import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IBrand } from '@shared-module';
import { Observable } from 'rxjs';

@Injectable()
export class BrandService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly brands = environment.api.endpoints['brands'];

  constructor(private http: HttpClient) {}

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.baseUrl}${this.brands}`);
  }
}
