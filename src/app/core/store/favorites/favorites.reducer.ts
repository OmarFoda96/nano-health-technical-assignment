import { createReducer, on } from '@ngrx/store';
import { FavoritesState } from '@core/models/product.model';
import * as FavoritesActions from '@core/store/favorites/favorites.actions';

const initialState: FavoritesState = {
  productIds: [],
};

export const favoritesReducer = createReducer(
  initialState,

  on(FavoritesActions.addToFavorites, (state, { productId }) => ({
    ...state,
    productIds: state.productIds.includes(productId)
      ? state.productIds
      : [...state.productIds, productId],
  })),

  on(FavoritesActions.removeFromFavorites, (state, { productId }) => ({
    ...state,
    productIds: state.productIds.filter((id) => id !== productId),
  })),

  on(FavoritesActions.toggleFavorite, (state, { productId }) => ({
    ...state,
    productIds: state.productIds.includes(productId)
      ? state.productIds.filter((id) => id !== productId)
      : [...state.productIds, productId],
  })),

  on(
    FavoritesActions.loadFavoritesFromStorageSuccess,
    (state, { productIds }) => ({
      ...state,
      productIds,
    })
  ),

  on(FavoritesActions.clearFavorites, () => initialState)
);
