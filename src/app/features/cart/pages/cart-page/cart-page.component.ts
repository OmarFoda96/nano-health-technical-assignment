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
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { CartItem } from '@core/models/product.model';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { LoadingService } from '@core/services/loading.service';

import * as CartActions from '@core/store/cart/cart.actions';
import * as CartSelectors from '@core/store/cart/cart.selectors';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    TranslateModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  cartItemCount$: Observable<number>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    public loadingService: LoadingService
  ) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartItemCount);
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCartFromStorage());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onUpdateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= 0) {
      this.onRemoveItem(item);
    } else {
      this.store.dispatch(
        CartActions.updateCartItemQuantity({
          productId: item.product.id,
          quantity,
        })
      );
    }
  }

  onRemoveItem(item: CartItem): void {
    this.store.dispatch(
      CartActions.removeFromCart({ productId: item.product.id })
    );
  }

  onClearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  onContinueShopping(): void {
    this.router.navigate(['/products']);
  }

  trackByProductId(index: number, item: CartItem): number {
    return item.product.id;
  }
}
