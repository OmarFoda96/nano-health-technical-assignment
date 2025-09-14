import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, MatChipsModule, TranslateModule],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFilterComponent {
  @Input() categories: string[] = [];
  @Input() selectedCategory: string | null = null;
  @Output() categoryChange = new EventEmitter<string | null>();

  onCategorySelect(category: string | null): void {
    this.categoryChange.emit(category);
  }
}
