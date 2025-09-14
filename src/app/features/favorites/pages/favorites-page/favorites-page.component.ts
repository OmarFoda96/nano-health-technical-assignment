import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '@core/models/product.model';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { LoadingService } from '@core/services/loading.service';

import * as FavoritesActions from '@core/store/favorites/favorites.actions';
import * as FavoritesSelectors from '@core/store/favorites/favorites.selectors';
import * as ProductsSelectors from '@core/store/products/products.selectors';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    ProductCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPageComponent implements OnInit, OnDestroy {
  favoriteProducts$: Observable<Product[]>;
  favoritesCount$: Observable<number>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    public loadingService: LoadingService
  ) {
    this.favoritesCount$ = this.store.select(FavoritesSelectors.selectFavoritesCount);

    this.favoriteProducts$ = combineLatest([
      this.store.select(FavoritesSelectors.selectFavoriteProductIds),
      this.store.select(ProductsSelectors.selectAllProducts)
    ]).pipe(
      map(([favoriteIds, products]) =>
        products.filter(product => favoriteIds.includes(product.id))
      )
    );
  }

  ngOnInit(): void {
    this.store.dispatch(FavoritesActions.loadFavoritesFromStorage());

    this.store.dispatch({ type: '[Products] Load Products' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProductClick(product: Product): void {
    this.router.navigate(['/products', product.id]);
  }

  onContinueShopping(): void {
    this.router.navigate(['/products']);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
