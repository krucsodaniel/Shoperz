import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { IProduct } from '../../models';
import { collection, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';
import { FirestoreCollection } from '../../enums';

@Injectable()
export class ProductService {
  private readonly productsCollectionRef = collection(this.firestore, FirestoreCollection.products);

  constructor(private firestore: Firestore) {}

  getProducts(): Observable<IProduct[]> {
    return from(getDocs(this.productsCollectionRef))
      .pipe(
        map((snapShot) => {
          const resultList = snapShot.docs.map((doc) => {
            const productData = doc.data() as IProduct;
            productData.id = doc.id;

            return productData;
          });

          return resultList;
        }),
      );
  }

  getProductById(id: string): Observable<IProduct> {
    const productsDoc = doc(this.firestore, `${ FirestoreCollection.products }/${ id }`);
    return from(getDoc(productsDoc))
      .pipe(
        map((doc) => {
          const productData = doc.data() as IProduct;
          productData.id = doc.id;

          return productData;
        }),
      )
  }

  updateProductWishlistProperty (productId: string, isOnWishlist: boolean): Observable<any> {
    const productsDoc = doc(this.firestore, `${ FirestoreCollection.products }/${ productId }`);
    return from(updateDoc(productsDoc, { isOnWishlist }));
  }
}
