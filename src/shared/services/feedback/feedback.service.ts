import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { IFeedback } from '../../models';
import { FirestoreCollection } from '../../enums';
import { addDoc, collection, Firestore, serverTimestamp } from '@angular/fire/firestore';

@Injectable()
export class FeedbackService {
  private readonly feedbacksCollectionRef = collection(this.firestore, FirestoreCollection.feedbacks);

  constructor(private firestore: Firestore) {}

  createNewFeedback(feedback: IFeedback): Observable<IFeedback> {
    return from(addDoc(this.feedbacksCollectionRef, { ...feedback, timestamp: serverTimestamp() }))
      .pipe(
        map((docRef) => {
          const feedbackId = docRef.id;

          const newFeedback: IFeedback = {
            id: feedbackId,
            message: feedback.message,
            name: feedback.name,
            email: feedback.email,
            rate: feedback.rate,
          };

          return newFeedback;
        }),
      );
  }
}
