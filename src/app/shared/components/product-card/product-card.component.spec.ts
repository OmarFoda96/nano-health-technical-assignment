import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { Product } from '@core/models/product.model';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 10,
    description: 'Test Description',
    category: 'test',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 100 },
  };

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        ProductCardComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        TranslateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;

    mockStore.select.and.returnValue(of(false));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.product-title').textContent).toContain(
      'Test Product'
    );
    expect(compiled.querySelector('.product-price').textContent).toContain(
      '$10.00'
    );
  });

  it('should emit productClick when clicked', () => {
    spyOn(component.productClick, 'emit');
    component.onProductClick();
    expect(component.productClick.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('should dispatch addToCart action', () => {
    const event = new Event('click');
    component.onAddToCart(event);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should dispatch toggleFavorite action', () => {
    const event = new Event('click');
    component.onToggleFavorite(event);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should track by product id', () => {
    const result = component.trackByProductId(0, mockProduct);
    expect(result).toBe(1);
  });
});
