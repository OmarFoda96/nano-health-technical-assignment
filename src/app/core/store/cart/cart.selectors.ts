import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '@core/models/product.model';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state: CartState) => state.total
);

export const selectCartItemCount = createSelector(
  selectCartState,
  (state: CartState) => state.itemCount
);

export const selectCartItemById = (productId: number) => createSelector(
  selectCartItems,
  (items) => items.find(item => item.product.id === productId)
);

export const selectIsInCart = (productId: number) => createSelector(
  selectCartItems,
  (items) => items.some(item => item.product.id === productId)
);
