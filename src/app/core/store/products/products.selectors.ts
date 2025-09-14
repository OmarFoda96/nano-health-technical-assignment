import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '@core/models/product.model';

export const selectProductsState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductState) => state.error
);

export const selectCategories = createSelector(
  selectProductsState,
  (state: ProductState) => state.categories
);

export const selectFilters = createSelector(
  selectProductsState,
  (state: ProductState) => state.filters
);

export const selectPagination = createSelector(
  selectProductsState,
  (state: ProductState) => state.pagination
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectFilters,
  (products, filters) => {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;

        if (filters.sortBy === 'title') {
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
        } else if (filters.sortBy === 'price') {
          aValue = a.price;
          bValue = b.price;
        }

        if (aValue < bValue) return filters.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }
);

export const selectPaginatedProducts = createSelector(
  selectFilteredProducts,
  selectPagination,
  (filteredProducts, pagination) => {
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    return filteredProducts.slice(startIndex, endIndex);
  }
);

export const selectProductById = (id: number) => createSelector(
  selectAllProducts,
  (products) => products.find(product => product.id === id)
);
