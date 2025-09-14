import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from '@core/models/product.model';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectFavoriteProductIds = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.productIds
);

export const selectIsFavorite = (productId: number) => createSelector(
  selectFavoriteProductIds,
  (productIds) => productIds.includes(productId)
);

export const selectFavoritesCount = createSelector(
  selectFavoriteProductIds,
  (productIds) => productIds.length
);
