import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner-wrap" [style.height]="size === 'lg' ? '80px' : '48px'" role="status" aria-label="Carregando...">
      <div class="spinner" [class]="'spinner--' + size"></div>
      @if (label) {
        <span class="spinner__label">{{ label }}</span>
      }
    </div>
  `,
  styles: [`
    .spinner-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .spinner {
      border-radius: 50%;
      border-top-color: var(--color-primary, #1A73E8);
      border-right-color: transparent;
      border-style: solid;
      animation: spin 0.7s linear infinite;
    }

    .spinner--sm { width: 20px; height: 20px; border-width: 2px; }
    .spinner--md { width: 36px; height: 36px; border-width: 3px; }
    .spinner--lg { width: 56px; height: 56px; border-width: 4px; }

    .spinner__label {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() label?: string;
}
