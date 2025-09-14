import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

export interface SortOption {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-sort-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslateModule
  ],
  templateUrl: './sort-dropdown.component.html',
  styleUrls: ['./sort-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortDropdownComponent {
  @Input() sortControl = new FormControl('');
  @Input() options: SortOption[] = [
    { value: 'title-asc', label: 'common.title', direction: 'asc' },
    { value: 'title-desc', label: 'common.title', direction: 'desc' },
    { value: 'price-asc', label: 'common.price', direction: 'asc' },
    { value: 'price-desc', label: 'common.price', direction: 'desc' }
  ];
  @Output() sortChange = new EventEmitter<{ sortBy: string; sortOrder: 'asc' | 'desc' }>();

  onSortChange(value: string): void {
    const [sortBy, sortOrder] = value.split('-') as [string, 'asc' | 'desc'];
    this.sortChange.emit({ sortBy, sortOrder });
  }
}
