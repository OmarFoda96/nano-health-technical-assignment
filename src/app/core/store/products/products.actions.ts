import { createAction, props } from '@ngrx/store';
import {
    Product,
    ProductFilters,
    PaginationInfo,
} from '@core/models/product.model';

export const loadProducts = createAction('[Products] Load Products');
export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const loadProductDetail = createAction(
  '[Products] Load Product Detail',
  props<{ id: number }>()
);
export const loadProductDetailSuccess = createAction(
  '[Products] Load Product Detail Success',
  props<{ product: Product }>()
);
export const loadProductDetailFailure = createAction(
  '[Products] Load Product Detail Failure',
  props<{ error: string }>()
);

export const loadCategories = createAction('[Products] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Products] Load Categories Success',
  props<{ categories: string[] }>()
);
export const loadCategoriesFailure = createAction(
  '[Products] Load Categories Failure',
  props<{ error: string }>()
);

export const loadProductsByCategory = createAction(
  '[Products] Load Products by Category',
  props<{ category: string }>()
);
export const loadProductsByCategorySuccess = createAction(
  '[Products] Load Products by Category Success',
  props<{ products: Product[] }>()
);
export const loadProductsByCategoryFailure = createAction(
  '[Products] Load Products by Category Failure',
  props<{ error: string }>()
);

export const setFilters = createAction(
  '[Products] Set Filters',
  props<{ filters: Partial<ProductFilters> }>()
);
export const clearFilters = createAction('[Products] Clear Filters');

export const setPagination = createAction(
  '[Products] Set Pagination',
  props<{ pagination: Partial<PaginationInfo> }>()
);

export const clearProductsState = createAction(
  '[Products] Clear Products State'
);
