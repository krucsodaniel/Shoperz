import { Injectable } from '@angular/core';
import { ICategory } from '../../models';
import { FirestoreCollection } from '../../enums';
import { from, map, Observable } from 'rxjs';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable()
export class CategoryService {
  private readonly categoriesCollectionRef = collection(this.firestore, FirestoreCollection.categories);

  constructor(private firestore: Firestore) {}

  getCategories(): Observable<ICategory[]> {
    return from(getDocs(this.categoriesCollectionRef))
      .pipe(
        map((snapShot) => {
          const resultList = snapShot.docs.map((doc) => {
            let categoryData = doc.data() as ICategory;
            categoryData.id = doc.id;
            return categoryData;
          })

          return resultList;
        }),
      );
  }
}
