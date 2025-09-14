import { createAction, props } from '@ngrx/store';
import { CartItem, Product } from '@core/models/product.model';

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ product: Product; quantity?: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove from Cart',
  props<{ productId: number }>()
);

export const updateCartItemQuantity = createAction(
  '[Cart] Update Cart Item Quantity',
  props<{ productId: number; quantity: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const loadCartFromStorage = createAction('[Cart] Load Cart from Storage');
export const loadCartFromStorageSuccess = createAction(
  '[Cart] Load Cart from Storage Success',
  props<{ items: CartItem[] }>()
);

export const saveCartToStorage = createAction('[Cart] Save Cart to Storage');
