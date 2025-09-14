import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [key: string]: any } = {};
  private readonly translationsLoaded$ = new BehaviorSubject<boolean>(false);
  private readonly currentLanguage = signal('en');

  constructor(private readonly http: HttpClient) {}

  getTranslationFile(): Observable<any> {
    const url = `./assets/i18n/${this.currentLanguage()}.json`;

    return this.http.get(url).pipe(
      tap((translations) => {
        this.translations[this.currentLanguage()] = translations;
        this.translationsLoaded$.next(true);
      }),
      catchError((error) => {
        return of({});
      })
    );
  }

  setCurrentLanguage(language: string) {
    this.currentLanguage.set(language);
  }
  getCurrentLanguage() {
    return this.currentLanguage();
  }
}
