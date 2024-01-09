import { Injectable } from '@angular/core';
import { collection, addDoc, Firestore, getDocs, query, where, getDoc, doc } from '@angular/fire/firestore';
import { FirestoreCollection } from '../../enums';
import { ILogin, IUser } from '../../models';
import { from, map, Observable, switchMap } from 'rxjs';

@Injectable()
export class UserService {
  private readonly usersCollectionRef = collection(this.firestore, FirestoreCollection.users);

  constructor(private firestore: Firestore) {}

  getUserByEmail(email: string): Observable<IUser> {
    const userQuery = query(this.usersCollectionRef, where('email', '==', `${ email }`));

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

  getUserById(userId: string): Observable<Omit<IUser, "password">> {
    const userDoc = doc(this.firestore, `${ FirestoreCollection.users }/${ userId }`);

    return from(getDoc(userDoc))
      .pipe(
        map((doc) => {
          const userData = doc.data() as IUser;
          userData.id = doc.id;

          const { password, ...user } = userData;

          return user;
        }),
      )
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

  loginUser(loginCredentials: ILogin): Observable<Omit<IUser,"password">> {
    return this.getUserByEmail(loginCredentials.email)
      .pipe(
        map((user: IUser) => {
          if (!user) {
            throw new Error('User not found');
          }

          if (loginCredentials.password !== user.password) {
            throw new Error('Incorrect password');
          }

          const { password, ...loggedInUser } = user;

          return loggedInUser;
        })
      )
  }
}
