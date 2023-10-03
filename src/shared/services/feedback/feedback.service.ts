import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IFeedback } from '../../models';

@Injectable()
export class FeedbackService {
  private readonly baseUrl = environment.api.baseUrl;
  private readonly feedbacks = environment.api.endpoints.feedbacks;

  constructor(private http: HttpClient) {}

  createNewFeedback(feedback: IFeedback): Observable<IFeedback> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    return this.http.post<IFeedback>(`${this.baseUrl}${this.feedbacks}`, { ...feedback, id: this.generateFeedbackId(), date: new Date() }, options);
  }

  private generateFeedbackId(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
