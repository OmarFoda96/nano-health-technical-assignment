import { createAction, props } from '@ngrx/store';

export const addToFavorites = createAction(
  '[Favorites] Add to Favorites',
  props<{ productId: number }>()
);

export const removeFromFavorites = createAction(
  '[Favorites] Remove from Favorites',
  props<{ productId: number }>()
);

export const toggleFavorite = createAction(
  '[Favorites] Toggle Favorite',
  props<{ productId: number }>()
);

export const loadFavoritesFromStorage = createAction('[Favorites] Load Favorites from Storage');
export const loadFavoritesFromStorageSuccess = createAction(
  '[Favorites] Load Favorites from Storage Success',
  props<{ productIds: number[] }>()
);

export const saveFavoritesToStorage = createAction('[Favorites] Save Favorites to Storage');

export const clearFavorites = createAction('[Favorites] Clear Favorites');
