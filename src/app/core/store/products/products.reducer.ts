import { createReducer, on } from '@ngrx/store';
import { ProductState } from '@core/models/product.model';
import * as ProductsActions from './products.actions';

const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: undefined,
    search: undefined,
    sortBy: 'title',
    sortOrder: 'asc',
    page: 1,
    limit: 12
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  }
};

export const productsReducer = createReducer(
  initialState,

  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
    pagination: {
      ...state.pagination,
      total: products.length,
      totalPages: Math.ceil(products.length / state.pagination.limit)
    }
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProductsActions.loadProductDetail, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductDetailSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    error: null,
    products: state.products.some(p => p.id === product.id)
      ? state.products.map(p => p.id === product.id ? product : p)
      : [...state.products, product]
  })),
  on(ProductsActions.loadProductDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProductsActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
    error: null
  })),
  on(ProductsActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProductsActions.loadProductsByCategory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductsByCategorySuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null,
    pagination: {
      ...state.pagination,
      total: products.length,
      totalPages: Math.ceil(products.length / state.pagination.limit)
    }
  })),
  on(ProductsActions.loadProductsByCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(ProductsActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),

  on(ProductsActions.clearFilters, (state) => ({
    ...state,
    filters: {
      category: undefined,
      search: undefined,
      sortBy: 'title' as 'title' | 'price',
      sortOrder: 'asc' as 'asc' | 'desc',
      page: 1,
      limit: 12
    }
  })),

  on(ProductsActions.setPagination, (state, { pagination }) => ({
    ...state,
    pagination: { ...state.pagination, ...pagination }
  })),

  on(ProductsActions.clearProductsState, () => initialState)
);
