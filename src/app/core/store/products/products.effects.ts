import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '@core/services/api.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(Store);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.apiService.getProducts().pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsFailure({
            error: error.message || 'Failed to load products'
          })))
        )
      )
    )
  );

  loadProductDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductDetail),
      switchMap(({ id }) =>
        this.apiService.getProduct(id).pipe(
          map(product => ProductsActions.loadProductDetailSuccess({ product })),
          catchError(error => of(ProductsActions.loadProductDetailFailure({
            error: error.message || 'Failed to load product detail'
          })))
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadCategories),
      switchMap(() =>
        this.apiService.getCategories().pipe(
          map(categories => ProductsActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(ProductsActions.loadCategoriesFailure({
            error: error.message || 'Failed to load categories'
          })))
        )
      )
    )
  );

  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsByCategory),
      switchMap(({ category }) =>
        this.apiService.getProductsByCategory(category).pipe(
          map(products => ProductsActions.loadProductsByCategorySuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsByCategoryFailure({
            error: error.message || 'Failed to load products by category'
          })))
        )
      )
    )
  );
}
