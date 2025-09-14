import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '@core/models/product.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsInCart } from '@core/store/cart/cart.selectors';
import { selectIsFavorite } from '@core/store/favorites/favorites.selectors';
import * as CartActions from '@core/store/cart/cart.actions';
import * as FavoritesActions from '@core/store/favorites/favorites.actions';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    TranslateModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() showActions: boolean = true;
  @Output() productClick = new EventEmitter<Product>();

  isInCart: WritableSignal<boolean> = signal(false);
  isFavorite$!: Observable<boolean>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    if (this.product) {
      this.store.select(selectIsInCart(this.product.id)).subscribe((value) => {
        this.isInCart.set(value);
      });
      this.isFavorite$ = this.store.select(selectIsFavorite(this.product.id));
    }
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    if (this.isInCart()) {
      this.store.dispatch(
        CartActions.removeFromCart({ productId: this.product.id })
      );
    } else {
      this.store.dispatch(CartActions.addToCart({ product: this.product }));
    }
  }

  onToggleFavorite(event: Event): void {
    event.stopPropagation();
    this.store.dispatch(
      FavoritesActions.toggleFavorite({ productId: this.product.id })
    );
  }

  onProductClick(): void {
    this.productClick.emit(this.product);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
