import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartItemCount } from '@core/store/cart/cart.selectors';
import { selectFavoritesCount } from '@core/store/favorites/favorites.selectors';
import { TranslationService } from '@shared/services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  cartItemCount$: Observable<number>;
  favoritesCount$: Observable<number>;
  currentLanguage: string = 'en';

  constructor(
    private readonly translate: TranslationService,
    private readonly store: Store
  ) {
    this.cartItemCount$ = this.store.select(selectCartItemCount);
    this.favoritesCount$ = this.store.select(selectFavoritesCount);
    this.currentLanguage = localStorage.getItem('language') ?? '';
  }

  switchLanguage(lang: string): void {
    localStorage.setItem('language', lang);
    this.currentLanguage = localStorage.getItem('language') ?? '';
    this.translate.setCurrentLanguage(lang);
  }
}
