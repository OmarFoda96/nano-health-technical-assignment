import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loaderCounter = 0;
  isLoading = signal(false);
  vositaLoader?: object;

  constructor(private readonly http: HttpClient) {}

  show() {
    this.loaderCounter++;
    this.isLoading.set(true);
  }

  hide() {
    this.loaderCounter--;
    if (this.loaderCounter <= 0) {
      setTimeout(() => {
        this.isLoading.set(false);
      }, 7000);
    }
  }
}
