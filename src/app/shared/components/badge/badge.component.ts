import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'purple' | 'alert';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="badge"
      [class]="'badge--' + variant"
      [attr.aria-label]="label ?? text"
    >
      @if (icon) {
        <span class="material-icons-round badge__icon">{{ icon }}</span>
      }
      {{ text }}
    </span>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      line-height: 1.4;
      white-space: nowrap;
    }

    .badge__icon {
      font-size: 14px;
    }

    .badge--primary {
      background: rgba(26,115,232,.1);
      color: #1A73E8;
      border: 1px solid rgba(26,115,232,.2);
    }

    .badge--success {
      background: rgba(52,168,83,.1);
      color: #34A853;
      border: 1px solid rgba(52,168,83,.2);
    }

    .badge--warning {
      background: rgba(251,188,5,.12);
      color: #B45309;
      border: 1px solid rgba(251,188,5,.3);
    }

    .badge--purple {
      background: rgba(147,52,230,.1);
      color: #9334E6;
      border: 1px solid rgba(147,52,230,.2);
    }

    .badge--alert {
      background: rgba(234,67,53,.1);
      color: #EA4335;
      border: 1px solid rgba(234,67,53,.2);
    }
  `],
})
export class BadgeComponent {
  @Input({ required: true }) text!: string;
  @Input() variant: BadgeVariant = 'primary';
  @Input() icon?: string;
  @Input() label?: string;
}
