import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Product } from '@core/models/product.model';
import { ApiError, CacheEntry } from '@shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://fakestoreapi.com';
  private readonly cache = new Map<string, CacheEntry<any>>();
  private readonly defaultTtl = 5 * 60 * 1000; // 5 minutes

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const cacheKey = 'products';
    const cached = this.getFromCache<Product[]>(cacheKey);

    if (cached) {
      return of(cached).pipe(
        map((products) => {
          return products;
        })
      );
    }

    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      retry(3),
      map((products) => {
        this.setCache(cacheKey, products);
        return products;
      }),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product> {
    const cacheKey = `product-${id}`;
    const cached = this.getFromCache<Product>(cacheKey);

    if (cached) {
      return of(cached);
    }

    return this.http.get<Product>(`${this.baseUrl}/products/${id}`).pipe(
      retry(3),
      map((product) => {
        this.setCache(cacheKey, product);
        return product;
      }),
      catchError(this.handleError)
    );
  }

  getCategories(): Observable<string[]> {
    const cacheKey = 'categories';
    const cached = this.getFromCache<string[]>(cacheKey);

    if (cached) {
      return of(cached);
    }

    return this.http.get<string[]>(`${this.baseUrl}/products/categories`).pipe(
      retry(3),
      map((categories) => {
        this.setCache(cacheKey, categories);
        return categories;
      }),
      catchError(this.handleError)
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const cacheKey = `products-category-${category}`;
    const cached = this.getFromCache<Product[]>(cacheKey);

    if (cached) {
      return of(cached);
    }

    return this.http
      .get<Product[]>(`${this.baseUrl}/products/category/${category}`)
      .pipe(
        retry(3),
        map((products) => {
          this.setCache(cacheKey, products);
          return products;
        }),
        catchError(this.handleError)
      );
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  private setCache<T>(
    key: string,
    data: T,
    ttl: number = this.defaultTtl
  ): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  clearCache(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  private readonly handleError = (
    error: HttpErrorResponse
  ): Observable<never> => {
    const apiError: ApiError = {
      message:
        error.error?.message || error.message || 'An unexpected error occurred',
      status: error.status,
      timestamp: new Date().toISOString(),
    };

    console.error('API Error:', apiError);
    return throwError(() => apiError);
  };
}
