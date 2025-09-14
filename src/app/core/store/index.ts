import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from '@core/store/app.state';
import { productsReducer } from '@core/store/products/products.reducer';
import { favoritesReducer } from '@core/store/favorites/favorites.reducer';
import { cartReducer } from '@core/store/cart/cart.reducer';

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  cart: cartReducer,
  favorites: favoritesReducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
