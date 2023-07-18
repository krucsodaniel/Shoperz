import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslationLoaderService {
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en-US');
    this.translate.use('en-US');
  }

  loadTranslation(): Observable<any> {
    return this.http.get(`./assets/i18n/${ this.translate.currentLang }.json`);
  }
}
