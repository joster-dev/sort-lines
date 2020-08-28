import { Component } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model: string | null = null;
  sortedModel = '';
  changeSubject = new Subject();
  ascending = true;
  ascendingItems = [
    { key: true, value: 'Ascending' },
    { key: false, value: 'Descending' }
  ];

  constructor() {
    this.changeSubject
      .pipe(debounceTime(500))
      .subscribe({
        next: () => this.sort()
      });
  }

  reset(): void {
    this.model = null;
    this.changeSubject.next();
  }

  private sort(): void {
    if (typeof this.model !== 'string' || this.model.trim().length === 0) {
      this.sortedModel = '';
      return;
    }
    this.sortedModel = this.model
      .split('\n')
      .filter(value => value.trim().length > 0)
      .sort((a, b) => a.localeCompare(b) * (this.ascending ? 1 : -1))
      .join('\n');
  }
}
