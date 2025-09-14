import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { ProductsEffects } from './core/store/products/products.effects';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/product-list-page/product-list-page.component').then(m => m.ProductListPageComponent),
    providers: [
      provideEffects([ProductsEffects])
    ]

  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/pages/product-detail-page/product-detail-page.component').then(m => m.ProductDetailPageComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/pages/cart-page/cart-page.component').then(m => m.CartPageComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./features/favorites/pages/favorites-page/favorites-page.component').then(m => m.FavoritesPageComponent)
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
