import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Product, ProductFilters } from '@core/models/product.model';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { SearchBarComponent } from '@shared/components/search-bar/search-bar.component';
import {
  SortDropdownComponent,
  SortOption,
} from '@shared/components/sort-dropdown/sort-dropdown.component';
import { CategoryFilterComponent } from '@shared/components/category-filter/category-filter.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LoadingService } from '@core/services/loading.service';
import { ApiService } from '@core/services/api.service';

import * as ProductsActions from '@core/store/products/products.actions';
import * as ProductsSelectors from '@core/store/products/products.selectors';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    ProductCardComponent,
    SearchBarComponent,
    SortDropdownComponent,
    CategoryFilterComponent,
    PaginationComponent,
    ErrorMessageComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListPageComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  error$: Observable<string | null>;
  categories$: Observable<string[]>;
  filters$: Observable<ProductFilters>;
  pagination$: Observable<any>;

  searchControl = new FormControl('');
  sortControl = new FormControl('title-asc');
  selectedCategory: string | null = null;

  sortOptions: SortOption[] = [
    { value: 'title-asc', label: 'common.title', direction: 'asc' },
    { value: 'title-desc', label: 'common.title', direction: 'desc' },
    { value: 'price-asc', label: 'common.price', direction: 'asc' },
    { value: 'price-desc', label: 'common.price', direction: 'desc' },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    public loadingService: LoadingService,
    private readonly apiService: ApiService
  ) {
    this.products$ = this.store.select(
      ProductsSelectors.selectPaginatedProducts
    );
    this.error$ = this.store.select(ProductsSelectors.selectProductsError);
    this.categories$ = this.store.select(ProductsSelectors.selectCategories);
    this.filters$ = this.store.select(ProductsSelectors.selectFilters);
    this.pagination$ = this.store.select(ProductsSelectors.selectPagination);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadProducts());
    this.store.dispatch(ProductsActions.loadCategories());

    this.filters$.pipe(takeUntil(this.destroy$)).subscribe((filters) => {
      this.searchControl.setValue(filters.search || '', { emitEvent: false });
      this.sortControl.setValue(`${filters.sortBy}-${filters.sortOrder}`, {
        emitEvent: false,
      });
      this.selectedCategory = filters.category || null;
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((search) => {
        this.store.dispatch(
          ProductsActions.setFilters({
            filters: { search: search || undefined },
          })
        );
      });

    this.sortControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          const [sortBy, sortOrder] = value.split('-') as [
            string,
            'asc' | 'desc'
          ];
          this.store.dispatch(
            ProductsActions.setFilters({
              filters: { sortBy: sortBy as 'title' | 'price', sortOrder },
            })
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCategoryChange(category: string | null): void {
    this.selectedCategory = category;
    this.store.dispatch(
      ProductsActions.setFilters({
        filters: { category: category || undefined },
      })
    );
  }

  onSortChange(sortData: { sortBy: string; sortOrder: 'asc' | 'desc' }): void {
    this.store.dispatch(
      ProductsActions.setFilters({
        filters: {
          sortBy: sortData.sortBy as 'title' | 'price',
          sortOrder: sortData.sortOrder,
        },
      })
    );
  }

  onPageChange(page: number): void {
    this.store.dispatch(
      ProductsActions.setPagination({ pagination: { page } })
    );
  }

  onProductClick(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  onSearchChange(search: string): void {
    this.store.dispatch(ProductsActions.setFilters({ filters: { search } }));
  }

  onRetry(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

}
