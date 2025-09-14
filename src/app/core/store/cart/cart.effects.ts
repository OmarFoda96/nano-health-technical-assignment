import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);

  saveCartToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CartActions.addToCart,
        CartActions.removeFromCart,
        CartActions.updateCartItemQuantity,
        CartActions.clearCart
      ),
      map(() => CartActions.saveCartToStorage())
    )
  );

  loadCartFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCartFromStorage),
      map(() => {
        const cartData = localStorage.getItem('cart');
        const items = cartData ? JSON.parse(cartData) : [];
        return CartActions.loadCartFromStorageSuccess({ items });
      })
    )
  );

  saveCartToStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.saveCartToStorage),
      tap(() => {
        this.store.select((state: any) => state.cart).subscribe(cart => {
          localStorage.setItem('cart', JSON.stringify(cart.items));
        });
      })
    ), { dispatch: false }
  );
}
