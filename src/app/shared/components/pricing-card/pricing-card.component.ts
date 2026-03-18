import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface PricingFeature {
  label: string;
  included: boolean;
  highlight?: boolean;
}

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div
      class="pricing-card"
      [class.pricing-card--highlighted]="highlighted"
      [class.pricing-card--enterprise]="enterprise"
      [attr.aria-label]="'Plano ' + planName"
    >
      @if (badge) {
        <div class="pricing-card__badge">{{ badge }}</div>
      }

      <div class="pricing-card__header">
        <h3 class="pricing-card__name">{{ planName }}</h3>
        <p class="pricing-card__desc">{{ description }}</p>
      </div>

      <div class="pricing-card__price">
        @if (!enterprise) {
          <span class="pricing-card__currency">R$</span>
          <span class="pricing-card__amount">{{ price }}</span>
          <span class="pricing-card__period">/mês</span>
        } @else {
          <span class="pricing-card__enterprise-label">Sob consulta</span>
        }
      </div>

      @if (!enterprise && annualPrice) {
        <p class="pricing-card__annual">
          <span class="material-icons-round">savings</span>
          ou R$ {{ annualPrice }}/mês no plano anual — economize 20%
        </p>
      }

      <div class="pricing-card__divider"></div>

      <ul class="pricing-card__features" [attr.aria-label]="'Recursos do plano ' + planName">
        @for (feature of features; track feature.label) {
          <li class="pricing-card__feature" [class.pricing-card__feature--excluded]="!feature.included">
            <span class="material-icons-round pricing-card__feature-icon">
              {{ feature.included ? 'check_circle' : 'cancel' }}
            </span>
            <span [class.pricing-card__feature--highlight]="feature.highlight">{{ feature.label }}</span>
          </li>
        }
      </ul>

      <button
        class="pricing-card__cta"
        [class.pricing-card__cta--primary]="highlighted"
        (click)="ctaClick.emit(planName)"
        [attr.aria-label]="'Escolher plano ' + planName"
      >
        {{ ctaLabel }}
        <span class="material-icons-round">arrow_forward</span>
      </button>
    </div>
  `,
  styles: [`
    .pricing-card {
      background: var(--color-surface, #fff);
      border: 2px solid var(--color-border, #E2E8F0);
      border-radius: 24px;
      padding: 36px 32px;
      display: flex;
      flex-direction: column;
      gap: 0;
      position: relative;
      transition: all 250ms cubic-bezier(0.4,0,0.2,1);

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0,0,0,.1);
      }
    }

    .pricing-card--highlighted {
      border-color: var(--color-primary, #1A73E8);
      box-shadow: 0 8px 40px rgba(26,115,232,.2);
      background: linear-gradient(180deg, rgba(26,115,232,.03) 0%, var(--color-surface, #fff) 100%);
    }

    .pricing-card__badge {
      position: absolute;
      top: -14px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--gradient-primary, linear-gradient(135deg, #1A73E8, #9334E6));
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 5px 18px;
      border-radius: 9999px;
      white-space: nowrap;
    }

    .pricing-card__header { margin-bottom: 24px; }

    .pricing-card__name {
      font-size: 1.375rem;
      font-weight: 800;
      color: var(--color-text-primary);
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }

    .pricing-card__desc {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    .pricing-card__price {
      display: flex;
      align-items: baseline;
      gap: 2px;
      margin-bottom: 8px;
    }

    .pricing-card__currency {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-secondary);
    }

    .pricing-card__amount {
      font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -0.04em;
      color: var(--color-text-primary);
    }

    .pricing-card__period {
      font-size: 1rem;
      color: var(--color-text-secondary);
    }

    .pricing-card__enterprise-label {
      font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-text-primary);
    }

    .pricing-card__annual {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8125rem;
      color: var(--color-secondary, #34A853);
      font-weight: 500;
      margin-bottom: 8px;

      .material-icons-round { font-size: 16px; }
    }

    .pricing-card__divider {
      height: 1px;
      background: var(--color-border, #E2E8F0);
      margin: 24px 0;
    }

    .pricing-card__features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
      margin-bottom: 32px;
    }

    .pricing-card__feature {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.9375rem;
      color: var(--color-text-primary);
      line-height: 1.5;
    }

    .pricing-card__feature--excluded {
      color: var(--color-text-muted, #9CA3AF);
      text-decoration-color: transparent;
    }

    .pricing-card__feature-icon {
      font-size: 18px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .pricing-card__feature:not(.pricing-card__feature--excluded) .pricing-card__feature-icon {
      color: var(--color-secondary, #34A853);
    }

    .pricing-card__feature--excluded .pricing-card__feature-icon {
      color: var(--color-text-muted, #9CA3AF);
    }

    .pricing-card__feature--highlight {
      font-weight: 600;
    }

    .pricing-card__cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 14px 24px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 200ms;
      border: 2px solid var(--color-primary, #1A73E8);
      background: transparent;
      color: var(--color-primary, #1A73E8);

      .material-icons-round { font-size: 18px; }

      &:hover {
        background: rgba(26,115,232,.06);
        transform: translateY(-1px);
      }

      &:focus-visible {
        outline: 3px solid var(--color-primary, #1A73E8);
        outline-offset: 3px;
      }
    }

    .pricing-card__cta--primary {
      background: var(--color-primary, #1A73E8);
      color: #fff;
      box-shadow: 0 6px 20px rgba(26,115,232,.35);

      &:hover {
        background: #1557B0;
        box-shadow: 0 8px 28px rgba(26,115,232,.45);
      }
    }
  `],
})
export class PricingCardComponent {
  @Input({ required: true }) planName!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) features!: PricingFeature[];
  @Input() price?: number;
  @Input() annualPrice?: number;
  @Input() highlighted = false;
  @Input() enterprise = false;
  @Input() badge?: string;
  @Input() ctaLabel = 'Começar agora';

  @Output() ctaClick = new EventEmitter<string>();
}
