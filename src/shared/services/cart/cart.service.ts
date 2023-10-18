import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable } from 'rxjs';
import { ICartItem } from '../../models';
import { FirestoreCollection } from '../../enums';
import { collection, deleteDoc, doc, Firestore, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable()
export class CartService {
  private readonly cartCollectionRef = collection(this.firestore, FirestoreCollection.cart);

  constructor(private firestore: Firestore) {}

  getCart(): Observable<ICartItem[]> {
    return from(getDocs(this.cartCollectionRef))
      .pipe(
        map((snapShot) => {
          const resultList = snapShot.docs.map((doc) => {
            const cartData = doc.data() as ICartItem;
            cartData.id = doc.id;
            return cartData;
          });

          return resultList;
        }),
      );
  }

  addProductToCart(id: string, amount: number): Observable<ICartItem> {
    const cartItemRef = doc(this.firestore, `${ FirestoreCollection.cart }/${ id }`);

    return from(setDoc(cartItemRef, { amount }))
      .pipe(
        map(() => {
          const cartItem: ICartItem = {
            id: id,
            amount: amount,
          };

          return cartItem;
        }),
      );
  }

  updateCart(id: string, amount: number): Observable<ICartItem> {
    const cartItemRef = doc(this.firestore, `${ FirestoreCollection.cart }/${ id }`);

    return from(updateDoc(cartItemRef, { amount }))
      .pipe(
        map(() => {
          const updatedItem: ICartItem = {
            id: id,
            amount: amount,
          };

          return updatedItem;
        }),
      )
  }

  removeProductFromCartById(id: string): Observable<void> {
    const cartItemRef = doc(this.firestore, `${ FirestoreCollection.cart }/${ id }`);

    return from(deleteDoc(cartItemRef));
  }

  clearCart(productIds: string[]): Observable<void[]> {
    return forkJoin(
      productIds.map((id: string) => this.removeProductFromCartById(id)),
    );
  }
}
