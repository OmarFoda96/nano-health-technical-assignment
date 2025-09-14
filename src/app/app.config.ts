import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { routes } from './app.routes';
import { reducers, metaReducers } from '@core/store';
import { ProductsEffects } from '@core/store/products/products.effects';
import { CartEffects } from '@core/store/cart/cart.effects';
import { FavoritesEffects } from '@core/store/favorites/favorites.effects';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([ErrorInterceptor])
    ),

    provideStore(reducers, { metaReducers }),
    provideEffects([ProductsEffects, CartEffects, FavoritesEffects]),
    provideZonelessChangeDetection(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    importProvidersFrom(TranslateModule.forRoot()),
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
};
