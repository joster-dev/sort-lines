import { Component, DoCheck, ElementRef, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  model: string | null = null;
  sortedModel: string | null = null;
  changeSubject = new Subject<void>();
  isDescend = true;
  sortOrders = [
    { key: true, value: 'Descend' },
    { key: false, value: 'Ascend' },
  ];
  isDark = true;
  themes = [
    { key: true, value: 'Dark' },
    { key: false, value: 'Light' },
  ];
  isRemoveDuplicate = false;
  isRemoveEmpty = true;
  yesNoOptions = [
    { key: true, value: 'Yes' },
    { key: false, value: 'No' },
  ];
  sortBy: 'abc' | 'length' = 'abc';
  sortOptions = [
    { key: 'abc', value: 'Alphabetically' },
    { key: 'length', value: 'Line Length' }
  ]
  isResultChanged = false;
  hasScrollbar = false;

  constructor(private hostElement: ElementRef) {
    this.changeSubject
      .pipe(debounceTime(500))
      .subscribe({
        next: () => this.sort()
      });
  }

  ngOnInit(): void {
    this.onChangeTheme();
  }

  ngDoCheck(): void {
    this.hasScrollbar = this.hostElement.nativeElement.clientHeight < this.hostElement.nativeElement.scrollHeight;
  }

  splitNewLine(value: string | null): string[] {
    return (value || '').split('\n');
  }

  onChangeResult(): void {
    this.isResultChanged = true;
  }

  onChangeTheme(): void {
    document.body.style.color = `#${this.isDark ? 'F5F5F5' : '0A0A0A'}`;
  }

  onClickClear(): void {
    this.model = null;
    this.changeSubject.next();
  }

  onClickCopy(): void {
    if (this.sortedModel === null) {
      return;
    }
    try {
      navigator.clipboard.writeText(this.sortedModel);
    } catch (error) {
      console.error(error);
    }
  }

  onClickTop(ele: HTMLElement): void {
    ele.scrollIntoView({
      behavior: 'smooth',
    });
  }

  private sort(): void {
    this.isResultChanged = false;
    if (typeof this.model !== 'string' || this.model.trim().length === 0) {
      this.sortedModel = null;
      return;
    }
    let split = this.splitNewLine(this.model);
    if (this.isRemoveDuplicate) {
      split = [...new Set(split)];
    }
    this.sortedModel = split
      .filter(value => !this.isRemoveEmpty || value.trim().length > 0)
      .sort((a, b) => {
        if (this.sortBy === 'abc') {
          return a.localeCompare(b) * (this.isDescend ? 1 : -1);
        } else {
          return (b.length - a.length) * (this.isDescend ? 1 : -1);
        }
      })
      .join('\n');
  }
}
