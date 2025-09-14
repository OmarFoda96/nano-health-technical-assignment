import { productsReducer } from '@core/store/products/products.reducer';
import * as ProductsActions from '@core/store/products/products.actions';
import { ProductState } from '@core/models/product.model';

describe('Products Reducer', () => {
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
      limit: 12,
    },
    pagination: {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0,
    },
  };

  it('should return the initial state', () => {
    const action = {} as any;
    const state = productsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loadProducts', () => {
    const action = ProductsActions.loadProducts();
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle loadProductsSuccess', () => {
    const products = [
      {
        id: 1,
        title: 'Test Product',
        price: 10,
        description: 'Test',
        category: 'test',
        image: 'test.jpg',
        rating: { rate: 4.5, count: 100 },
      },
    ];
    const action = ProductsActions.loadProductsSuccess({ products });
    const state = productsReducer(initialState, action);
    expect(state.products).toEqual(products);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle loadProductsFailure', () => {
    const error = 'Test error';
    const action = ProductsActions.loadProductsFailure({ error });
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  it('should handle setFilters', () => {
    const filters = { search: 'test' };
    const action = ProductsActions.setFilters({ filters });
    const state = productsReducer(initialState, action);
    expect(state.filters.search).toBe('test');
  });

  it('should handle clearFilters', () => {
    const stateWithFilters = {
      ...initialState,
      filters: {
        category: 'test',
        search: 'test',
        sortBy: 'price' as const,
        sortOrder: 'desc' as const,
        page: 2,
        limit: 20,
      },
    };
    const action = ProductsActions.clearFilters();
    const state = productsReducer(stateWithFilters, action);
    expect(state.filters).toEqual(initialState.filters);
  });
});
