import { Component } from '@angular/core';

@Component({
  selector: 'sl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  model: string | null = null;
  sortedModel = '';

  submit(): void {
    if (typeof this.model !== 'string' || this.model.trim().length === 0) {
      this.sortedModel = '';
      return;
    }
    this.sortedModel = this.model
      .split('\n')
      .sort((a, b) => {
        const shortString = a.length < b.length
          ? a
          : b;
        for (let i = 0; i < shortString.length; i++) {
          const compare = a.charCodeAt(i) - b.charCodeAt(i);
          if (compare < 0) {
            return -1;
          } else if (compare > 0) {
            return 1;
          }
        }
        return 1;
      })
      .join('\n');
  }
}
