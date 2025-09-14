import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from '@core/services/api.service';
import { Product } from '@core/models/product.model';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);

    service.clearCache();
  });

  afterEach(() => {
    service.clearCache();

    try {
      httpMock.verify();
    } catch (error) {
      console.warn('Cleaning up pending HTTP requests:', error);
      const pendingRequests = httpMock.match(() => true);
      pendingRequests.forEach(req => req.flush({}));
      httpMock.verify();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const mockProducts: Product[] = [
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

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should fetch product by id', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Test Product',
      price: 10,
      description: 'Test',
      category: 'test',
      image: 'test.jpg',
      rating: { rate: 4.5, count: 100 },
    };

    service.getProduct(1).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should fetch categories', () => {
    const mockCategories = ['electronics', 'jewelry', "men's clothing"];

    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(
      'https://fakestoreapi.com/products/categories'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });


  it('should use cache for subsequent requests', () => {
    const mockProducts: Product[] = [
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

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req1 = httpMock.expectOne('https://fakestoreapi.com/products');
    req1.flush(mockProducts);

    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    httpMock.expectNone('https://fakestoreapi.com/products');
  });

  it('should clear cache when requested', () => {
    const mockProducts: Product[] = [
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

    service.getProducts().subscribe();
    const req1 = httpMock.expectOne('https://fakestoreapi.com/products');
    req1.flush(mockProducts);

    service.clearCache();

    service.getProducts().subscribe();
    const req2 = httpMock.expectOne('https://fakestoreapi.com/products');
    req2.flush(mockProducts);
  });
});
