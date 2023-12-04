import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';


@Injectable()
export class WishlistService {

  constructor(private firestore: Firestore) {}

}
