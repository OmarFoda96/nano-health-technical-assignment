import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '@layouts/header/header.component';
import { TranslationService } from '@shared/services/translation.service';
import * as CartActions from '@core/store/cart/cart.actions';
import * as FavoritesActions from '@core/store/favorites/favorites.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly translate: TranslateService,
    private readonly translationService: TranslationService
  ) {
    effect(() => {
      this.translationService.getTranslationFile().subscribe({
        next: (translations) => {
          this.translate.setTranslation(
            translationService.getCurrentLanguage(),
            translations
          );
          this.translate.use(translationService.getCurrentLanguage());
        },
        error: (error) => {
          console.error('Failed to load custom translations:', error);
        },
      });
    });
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.loadCartFromStorage());
    this.store.dispatch(FavoritesActions.loadFavoritesFromStorage());
  }
}
