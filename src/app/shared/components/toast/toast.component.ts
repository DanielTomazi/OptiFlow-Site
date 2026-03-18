import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  template: `
    @if (visible) {
      <div
        class="toast"
        [class]="'toast--' + type"
        role="alert"
        aria-live="polite"
        [@slideInOut]
      >
        <span class="material-icons-round toast__icon">{{ iconMap[type] }}</span>
        <div class="toast__body">
          @if (title) { <strong class="toast__title">{{ title }}</strong> }
          <span class="toast__message">{{ message }}</span>
        </div>
        <button class="toast__close" (click)="dismiss()" aria-label="Fechar notificação">
          <span class="material-icons-round">close</span>
        </button>
      </div>
    }
  `,
  styles: [`
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 300;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px 20px;
      border-radius: 14px;
      min-width: 300px;
      max-width: 420px;
      box-shadow: 0 8px 32px rgba(0,0,0,.15);
      backdrop-filter: blur(12px);

      @media (max-width: 480px) {
        right: 16px;
        left: 16px;
        min-width: unset;
      }
    }

    .toast--success { background: #064E3B; color: #A7F3D0; .toast__icon { color: #34D399; } }
    .toast--error   { background: #7F1D1D; color: #FCA5A5; .toast__icon { color: #F87171; } }
    .toast--info    { background: #1E3A5F; color: #BAE6FD; .toast__icon { color: #38BDF8; } }
    .toast--warning { background: #78350F; color: #FDE68A; .toast__icon { color: #FBBF24; } }

    .toast__icon { font-size: 22px; flex-shrink: 0; margin-top: 1px; }

    .toast__body {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .toast__title {
      font-size: 0.9375rem;
      font-weight: 700;
    }

    .toast__message { font-size: 0.875rem; line-height: 1.5; }

    .toast__close {
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0.7;
      padding: 2px;
      display: flex;
      align-items: center;
      color: inherit;
      &:hover { opacity: 1; }
      .material-icons-round { font-size: 18px; }
    }
  `],
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input({ required: true }) message!: string;
  @Input() type: ToastType = 'info';
  @Input() title?: string;
  @Input() duration = 5000;
  @Output() dismissed = new EventEmitter<void>();

  visible = true;
  private timer?: ReturnType<typeof setTimeout>;

  readonly iconMap: Record<ToastType, string> = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning',
  };

  ngOnInit(): void {
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.dismiss(), this.duration);
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  dismiss(): void {
    this.visible = false;
    setTimeout(() => this.dismissed.emit(), 300);
  }
}
