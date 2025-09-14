import { createReducer, on } from '@ngrx/store';
import { CartState, CartItem } from '@core/models/product.model';
import * as CartActions from './cart.actions';

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

export const cartReducer = createReducer<CartState>(
  initialState,

  on(CartActions.addToCart, (state, { product, quantity = 1 }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);

    if (existingItem) {
      const updatedItems = state.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems)
      };
    } else {
      const newItem: CartItem = { product, quantity };
      const updatedItems = [...state.items, newItem];

      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: calculateItemCount(updatedItems)
      };
    }
  }),

  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedItems = state.items.filter(item => item.product.id !== productId);

    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
      itemCount: calculateItemCount(updatedItems)
    };
  }),

  on(CartActions.updateCartItemQuantity, (state: CartState, { productId, quantity }): CartState => {
    if (quantity <= 0) {
      return cartReducer(state, CartActions.removeFromCart({ productId }));
    }

    const updatedItems = state.items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );

    return {
      ...state,
      items: updatedItems,
      total: calculateTotal(updatedItems),
      itemCount: calculateItemCount(updatedItems)
    };
  }),

  on(CartActions.clearCart, () => initialState),

  on(CartActions.loadCartFromStorageSuccess, (state, { items }) => ({
    ...state,
    items,
    total: calculateTotal(items),
    itemCount: calculateItemCount(items)
  }))
);

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}
