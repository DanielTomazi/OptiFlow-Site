import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feature-card" [class.feature-card--glass]="glass" [class.feature-card--dark]="dark">
      <div class="feature-card__icon-wrap" [style.background]="iconBg">
        <span class="material-icons-round feature-card__icon" [style.color]="iconColor">{{ icon }}</span>
      </div>
      <h3 class="feature-card__title">{{ title }}</h3>
      <p class="feature-card__desc">{{ description }}</p>
      @if (bullets?.length) {
        <ul class="feature-card__list">
          @for (item of bullets; track item) {
            <li class="feature-card__list-item">
              <span class="material-icons-round feature-card__check">check_circle</span>
              {{ item }}
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [`
    .feature-card {
      background: var(--color-surface, #fff);
      border: 1px solid var(--color-border, #E2E8F0);
      border-radius: 20px;
      padding: 32px;
      transition: all 250ms cubic-bezier(0.4,0,0.2,1);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: var(--gradient-primary, linear-gradient(135deg, #1A73E8, #9334E6));
        opacity: 0;
        transition: opacity 250ms;
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl, 0 20px 25px rgba(0,0,0,.1));
        border-color: rgba(26,115,232,.2);
        &::before { opacity: 1; }
      }
    }

    .feature-card--glass {
      background: rgba(255,255,255,0.06);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12);
    }

    .feature-card--dark {
      background: rgba(30,41,59,0.8);
      border-color: rgba(255,255,255,.1);
      .feature-card__title { color: #F1F5F9; }
      .feature-card__desc { color: #94A3B8; }
    }

    .feature-card__icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    }

    .feature-card__icon {
      font-size: 32px;
    }

    .feature-card__title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: -0.02em;
      color: var(--color-text-primary);
    }

    .feature-card__desc {
      font-size: 0.9375rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .feature-card__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .feature-card__list-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.875rem;
      color: var(--color-text-secondary);
    }

    .feature-card__check {
      font-size: 16px;
      color: var(--color-secondary, #34A853);
      flex-shrink: 0;
      margin-top: 1px;
    }
  `],
})
export class FeatureCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) icon!: string;
  @Input() iconColor = '#1A73E8';
  @Input() iconBg = 'rgba(26,115,232,.1)';
  @Input() bullets?: string[];
  @Input() glass = false;
  @Input() dark = false;
}
