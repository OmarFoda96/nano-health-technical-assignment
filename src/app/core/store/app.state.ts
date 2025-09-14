import { ProductState, CartState, FavoritesState } from '@core/models/product.model';

export interface AppState {
  products: ProductState;
  cart: CartState;
  favorites: FavoritesState;
}
