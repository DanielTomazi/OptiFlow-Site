import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="divider"
      [class.divider--vertical]="vertical"
      [style.height]="vertical ? height : undefined"
      [style.width]="!vertical ? '100%' : undefined"
      role="separator"
      [attr.aria-orientation]="vertical ? 'vertical' : 'horizontal'"
    ></div>
  `,
  styles: [`
    .divider {
      background: linear-gradient(90deg, transparent, var(--color-border, #E2E8F0) 30%, var(--color-border, #E2E8F0) 70%, transparent);
      height: 1px;
      border: none;
      margin: 0;
    }

    .divider--vertical {
      background: linear-gradient(180deg, transparent, var(--color-border, #E2E8F0) 30%, var(--color-border, #E2E8F0) 70%, transparent);
      width: 1px !important;
      height: 100%;
    }
  `],
})
export class DividerComponent {
  @Input() vertical = false;
  @Input() height = '100%';
}
