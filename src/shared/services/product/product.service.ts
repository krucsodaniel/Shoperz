import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, from, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../models';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable()
export class ProductService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly products = environment.api.endpoints.products;
  private readonly productsCollectionRef = collection(this.firestore, "products");

  constructor(private http: HttpClient, private firestore: Firestore) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}${this.products}`).pipe(delay(1000));
  }

  getProductsWithFirestore(): Observable<IProduct[]> {
    return from(getDocs(this.productsCollectionRef))
      .pipe(
        map((snapShot) => {
          const resultList = snapShot.docs.map((doc) => {
            let productData = doc.data() as IProduct;
            return productData;
          })
          return resultList;
        }),
      );
  }

  getProductById(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}${this.products}/${productId}`);
  }
}
