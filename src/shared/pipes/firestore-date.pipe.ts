import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firestoreDate' })
export class FirestoreDatePipe implements PipeTransform {
  transform(firebaseTimestamp: { seconds: number, nanoseconds: number }): Date | null {
    if (!firebaseTimestamp) {
      return null;
    }
    const timestampMilliseconds = firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000;

    return new Date(timestampMilliseconds);
  }
}
