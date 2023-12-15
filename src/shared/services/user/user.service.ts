import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, getDocs, query, where, getDoc } from '@angular/fire/firestore';
import { FirestoreCollection, IUser } from '@shared-module';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable()
export class UserService {
  private readonly usersCollectionRef = collection(this.firestore, FirestoreCollection.users);

  getUserByEmail(email: string): Observable<IUser> {
    const userQuery = query(this.usersCollectionRef, where('email', '==', `${email}`));

    return from(getDocs(userQuery))
      .pipe(
        map((querySnapshot) => {
          let user: IUser;

          querySnapshot.forEach((doc) => {
            const userData = doc.data() as IUser;
            userData.id = doc.id;

            user = userData;
          });

          return user;
        }),
      );
  }

  registerUser(user: IUser): Observable<IUser> {
    return from(addDoc(this.usersCollectionRef, user)).pipe(
      switchMap((docRef) => {
        return from(getDoc(docRef))
          .pipe(
            map((docSnapshot) => {
              const newUser = { ...docSnapshot.data(), id: docSnapshot.id } as IUser;

              return newUser;
            })
          );
      })
    );
  }

  constructor(private firestore: Firestore) {}
}
