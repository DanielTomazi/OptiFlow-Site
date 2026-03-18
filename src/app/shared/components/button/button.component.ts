import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (href) {
      <a
        [href]="href"
        [target]="external ? '_blank' : '_self'"
        [rel]="external ? 'noopener noreferrer' : null"
        class="btn"
        [class]="btnClasses"
        [attr.aria-label]="ariaLabel ?? null"
      >
        @if (iconLeft) {
          <span class="material-icons-round btn__icon btn__icon--left">{{ iconLeft }}</span>
        }
        <ng-content />
        @if (iconRight) {
          <span class="material-icons-round btn__icon btn__icon--right">{{ iconRight }}</span>
        }
      </a>
    } @else if (routerPath) {
      <a
        [routerLink]="routerPath"
        class="btn"
        [class]="btnClasses"
        [attr.aria-label]="ariaLabel ?? null"
      >
        @if (iconLeft) {
          <span class="material-icons-round btn__icon btn__icon--left">{{ iconLeft }}</span>
        }
        <ng-content />
        @if (iconRight) {
          <span class="material-icons-round btn__icon btn__icon--right">{{ iconRight }}</span>
        }
      </a>
    } @else {
      <button
        [type]="type"
        class="btn"
        [class]="btnClasses"
        [disabled]="disabled || loading"
        [attr.aria-label]="ariaLabel ?? null"
        [attr.aria-busy]="loading"
        (click)="onClick.emit($event)"
      >
        @if (loading) {
          <span class="btn__spinner" aria-hidden="true"></span>
        } @else if (iconLeft) {
          <span class="material-icons-round btn__icon btn__icon--left">{{ iconLeft }}</span>
        }
        <ng-content />
        @if (!loading && iconRight) {
          <span class="material-icons-round btn__icon btn__icon--right">{{ iconRight }}</span>
        }
      </button>
    }
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-weight: 600;
      letter-spacing: 0;
      line-height: 1;
      text-decoration: none;
      transition: all 200ms cubic-bezier(0.4,0,0.2,1);
      white-space: nowrap;
      position: relative;
      overflow: hidden;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      &:focus-visible {
        outline: 3px solid var(--color-primary, #1A73E8);
        outline-offset: 3px;
      }

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(255,255,255,0);
        transition: background 200ms;
      }

      &:hover::after { background: rgba(255,255,255,0.08); }
      &:active::after { background: rgba(0,0,0,0.08); }
    }

    /* Sizes */
    .btn--sm  { padding: 8px 16px; font-size: 0.8125rem; }
    .btn--md  { padding: 12px 24px; font-size: 0.9375rem; }
    .btn--lg  { padding: 16px 32px; font-size: 1.0625rem; }

    /* Variants */
    .btn--primary {
      background: var(--color-primary, #1A73E8);
      color: #fff;
      box-shadow: 0 4px 16px rgba(26,115,232,.35);
      &:hover {
        background: #1557B0;
        box-shadow: 0 6px 24px rgba(26,115,232,.45);
        transform: translateY(-1px);
      }
      &:active { transform: translateY(0); }
    }

    .btn--secondary {
      background: var(--color-secondary, #34A853);
      color: #fff;
      box-shadow: 0 4px 16px rgba(52,168,83,.3);
      &:hover {
        background: #2d9147;
        transform: translateY(-1px);
      }
    }

    .btn--outlined {
      background: transparent;
      color: var(--color-primary, #1A73E8);
      border: 2px solid var(--color-primary, #1A73E8);
      &:hover {
        background: rgba(26,115,232,.06);
        transform: translateY(-1px);
      }
    }

    .btn--ghost {
      background: transparent;
      color: var(--color-text-primary, #1C1C1E);
      &:hover { background: rgba(0,0,0,.05); }
    }

    .btn--danger {
      background: var(--color-alert, #EA4335);
      color: #fff;
      &:hover { background: #d33528; }
    }

    /* Full width */
    .btn--full { width: 100%; }

    /* Icon */
    .btn__icon { font-size: 18px; line-height: 1; }
    .btn__icon--left { margin-right: -2px; }
    .btn__icon--right { margin-left: -2px; }

    /* Spinner */
    .btn__spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255,255,255,.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() ariaLabel?: string;
  @Input() href?: string;
  @Input() routerPath?: string | string[];
  @Input() external = false;

  @Output() onClick = new EventEmitter<MouseEvent>();

  get btnClasses(): string {
    return [
      `btn--${this.variant}`,
      `btn--${this.size}`,
      this.fullWidth ? 'btn--full' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
