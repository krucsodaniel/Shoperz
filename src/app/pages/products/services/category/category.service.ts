import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICategory } from '@shared-module';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly categories = environment.api.endpoints['categories'];

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}${this.categories}`);
  }
}
