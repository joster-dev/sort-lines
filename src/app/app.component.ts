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
  sortedModel: string | null = null;
  changeSubject = new Subject();
  ascending = true;
  ascendingItems = [
    { key: true, value: 'Ascending' },
    { key: false, value: 'Descending' }
  ];
  readonly lightColor = 'F5F5F5';
  theme = this.lightColor;
  themeItems = [
    { key: this.lightColor, value: 'Dark' },
    { key: '0A0A0A', value: 'Light' }
  ];

  constructor() {
    this.changeSubject
      .pipe(debounceTime(500))
      .subscribe({
        next: () => this.sort()
      });
  }

  copy(): void {
    if (this.sortedModel === null) {
      return;
    }
    try {
      navigator.clipboard.writeText(this.sortedModel);
    } catch (error) {
      console.error(error);
    }
  }

  reset(): void {
    this.model = null;
    this.changeSubject.next();
  }

  onChangeTheme(): void {
    document.body.style.color = `#${this.theme}`;
  }

  private sort(): void {
    if (typeof this.model !== 'string' || this.model.trim().length === 0) {
      this.sortedModel = null;
      return;
    }
    this.sortedModel = this.model
      .split('\n')
      .filter(value => value.trim().length > 0)
      .sort((a, b) => a.localeCompare(b) * (this.ascending ? 1 : -1))
      .join('\n');
  }
}
