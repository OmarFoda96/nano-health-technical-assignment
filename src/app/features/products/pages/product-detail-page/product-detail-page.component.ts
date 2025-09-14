import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter, switchMap } from 'rxjs/operators';

import { Product } from '@core/models/product.model';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LoadingService } from '@core/services/loading.service';

import * as ProductsActions from '@core/store/products/products.actions';
import * as ProductsSelectors from '@core/store/products/products.selectors';
import * as FavoritesActions from '@core/store/favorites/favorites.actions';
import * as CartActions from '@core/store/cart/cart.actions';
import * as CartSelectors from '@core/store/cart/cart.selectors';
import * as FavoritesSelectors from '@core/store/favorites/favorites.selectors';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    TranslateModule,
    ErrorMessageComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailPageComponent implements OnInit, OnDestroy {
  product$!: Observable<Product | undefined>;
  error$: Observable<string | null>;
  isInCart: WritableSignal<boolean> = signal(false);
  isFavorite$!: Observable<boolean>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store,
    public loadingService: LoadingService
  ) {
    this.error$ = this.store.select(ProductsSelectors.selectProductsError);
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        takeUntil(this.destroy$),
        filter((params) => params['id']),
        switchMap((params) => {
          const productId = +params['id'];

          this.product$ = this.store.select(
            ProductsSelectors.selectProductById(productId)
          );
          this.store
            .select(CartSelectors.selectIsInCart(productId))
            .subscribe((value) => {
              this.isInCart.set(value);
            });
          this.isFavorite$ = this.store.select(
            FavoritesSelectors.selectIsFavorite(productId)
          );

          this.store.dispatch(
            ProductsActions.loadProductDetail({ id: productId })
          );

          return this.product$;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddToCart(product: Product): void {
    if (this.isInCart()) {
      this.store.dispatch(
        CartActions.removeFromCart({ productId: product.id })
      );
    } else {
      this.store.dispatch(CartActions.addToCart({ product, quantity: 1 }));
    }
  }

  onToggleFavorite(product: Product): void {
    this.store.dispatch(
      FavoritesActions.toggleFavorite({ productId: product.id })
    );
  }

  onBackToProducts(): void {
    this.router.navigate(['/products']);
  }

  onRetry(): void {
    const productId = +this.route.snapshot.params['id'];
    this.store.dispatch(ProductsActions.loadProductDetail({ id: productId }));
  }

  getStarArray(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? 1 : 0
    );
  }
}
