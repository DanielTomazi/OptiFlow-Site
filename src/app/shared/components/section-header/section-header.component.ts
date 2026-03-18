import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header" [class.section-header--left]="align === 'left'">
      @if (eyebrow) {
        <span class="section-header__eyebrow" [class.section-header__eyebrow--light]="light">
          {{ eyebrow }}
        </span>
      }
      <h2 class="section-header__title" [class.section-header__title--light]="light">
        {{ title }}
        @if (titleHighlight) {
          <span class="gradient-text"> {{ titleHighlight }}</span>
        }
      </h2>
      @if (subtitle) {
        <p class="section-header__subtitle" [class.section-header__subtitle--light]="light">
          {{ subtitle }}
        </p>
      }
    </div>
  `,
  styles: [`
    .section-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 64px;
    }

    .section-header--left {
      text-align: left;
      margin-left: 0;
      margin-right: 0;
    }

    .section-header__eyebrow {
      display: inline-block;
      font-size: 0.8125rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-primary);
      background: rgba(26,115,232,.1);
      padding: 4px 14px;
      border-radius: 9999px;
      margin-bottom: 16px;
    }

    .section-header__eyebrow--light {
      color: #93C5FD;
      background: rgba(147,197,253,.15);
    }

    .section-header__title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      color: var(--color-text-primary);
      margin-bottom: 20px;
    }

    .section-header__title--light {
      color: #F1F5F9;
    }

    .section-header__subtitle {
      font-size: 1.125rem;
      line-height: 1.75;
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }

    .section-header__subtitle--light {
      color: #94A3B8;
    }

    .section-header--left .section-header__subtitle {
      margin-left: 0;
    }

    .gradient-text {
      background: var(--gradient-primary, linear-gradient(135deg, #1A73E8 0%, #9334E6 100%));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `],
})
export class SectionHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input() titleHighlight?: string;
  @Input() subtitle?: string;
  @Input() eyebrow?: string;
  @Input() align: 'center' | 'left' = 'center';
  @Input() light = false;
}
