import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import * as FavoritesActions from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  saveFavoritesToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        FavoritesActions.addToFavorites,
        FavoritesActions.removeFromFavorites,
        FavoritesActions.toggleFavorite,
        FavoritesActions.clearFavorites
      ),
      map(() => FavoritesActions.saveFavoritesToStorage())
    )
  );

  loadFavoritesFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavoritesFromStorage),
      map(() => {
        const favoritesData = localStorage.getItem('favorites');
        const productIds = favoritesData ? JSON.parse(favoritesData) : [];
        return FavoritesActions.loadFavoritesFromStorageSuccess({ productIds });
      })
    )
  );

  saveFavoritesToStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.saveFavoritesToStorage),
      tap(() => {
        this.store.select((state: any) => state.favorites).subscribe(favorites => {
          localStorage.setItem('favorites', JSON.stringify(favorites.productIds));
        });
      })
    ), { dispatch: false }
  );
}
