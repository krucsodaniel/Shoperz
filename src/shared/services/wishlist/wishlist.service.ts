import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';


@Injectable()
export class WishlistService {

  constructor(private firestore: Firestore) {}

  getWishlist() {
  }

  // addProductToWishlist(id: string): Observable<IProduct> {
  //   const productRef = doc(this.firestore, `${ FirestoreCollection.products }/${ id }`)

    // return from(updateDoc(productRef, { isOnWishlist: true }))
    //   .pipe(
    //     map(() => {
    //       const updatedItem: IProduct = {
    //         ...products,
    //         id: id,
    //         isOnWishlist: true
    //       };
    //
    //       return updatedItem
    //     })
    //   )

  // }


  // removeProductFromWishlistById(id: string) {
  //
  // }
}
