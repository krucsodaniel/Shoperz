import { Injectable } from '@angular/core';
import { IBrand } from '../../models';
import { FirestoreCollection } from '../../enums';
import { from, map, Observable } from 'rxjs';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable()
export class BrandService {
  private readonly brandsCollectionRef = collection(this.firestore, FirestoreCollection.brands);

  constructor(private firestore: Firestore) {}

  getBrands(): Observable<IBrand[]> {
    return from(getDocs(this.brandsCollectionRef))
      .pipe(
        map((snapShot) => {
          const resultList = snapShot.docs.map((doc) => {
            const brandData = doc.data() as IBrand;
            brandData.id = doc.id;
            return brandData;
          });

          return resultList;
        }),
      );
  }
}
