import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { IOrder } from '../../models';
import { FirestoreCollection } from '../../enums';
import { addDoc, collection, Firestore, getDocs, serverTimestamp } from '@angular/fire/firestore';

@Injectable()
export class OrdersService {
  private readonly ordersCollectionRef = collection(this.firestore, FirestoreCollection.orders);

  constructor(private firestore: Firestore) {}

  getOrders(): Observable<IOrder[]> {
    return from(getDocs(this.ordersCollectionRef))
      .pipe(
        map((snapShot) => {
          const resultList = snapShot.docs.map((doc) => {
            let ordersData = doc.data() as IOrder;
            ordersData.id = doc.id;
            return ordersData;
          });

          return resultList;
        }),
      );
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return from(addDoc(this.ordersCollectionRef, { ...order, timestamp: serverTimestamp()} ))
      .pipe(
        map((docRef) => {
          const orderId = docRef.id;

          const newOrder: IOrder = {
            id: orderId,
            products: order.products,
            status: order.status,
            totalAmount: order.totalAmount,
          };

          return newOrder;
        }),
      );
  }
}
