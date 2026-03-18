import { Component, Input, OnInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat" [attr.aria-label]="label + ': ' + displayValue + suffix">
      <div class="stat__value">
        <span class="stat__number">{{ displayValue }}</span>
        <span class="stat__suffix">{{ suffix }}</span>
      </div>
      <p class="stat__label">{{ label }}</p>
      @if (description) {
        <p class="stat__desc">{{ description }}</p>
      }
    </div>
  `,
  styles: [`
    .stat {
      text-align: center;
    }

    .stat__value {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 2px;
      line-height: 1;
      margin-bottom: 8px;
    }

    .stat__number {
      font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      background: var(--gradient-primary, linear-gradient(135deg, #1A73E8 0%, #9334E6 100%));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat__suffix {
      font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
      font-size: clamp(1.5rem, 3vw, 2.5rem);
      font-weight: 700;
      color: var(--color-primary, #1A73E8);
    }

    .stat__label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }

    .stat__desc {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      line-height: 1.5;
    }
  `],
})
export class StatCounterComponent implements OnInit, OnDestroy {
  @Input({ required: true }) target!: number;
  @Input({ required: true }) label!: string;
  @Input() suffix = '';
  @Input() prefix = '';
  @Input() description?: string;
  @Input() duration = 2000;

  displayValue = '0';
  private observer!: IntersectionObserver;
  private el = inject(ElementRef);
  private animating = false;

  ngOnInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.displayValue = this.prefix + this.target.toString();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animating) {
          this.animating = true;
          this.runCounter();
        }
      },
      { threshold: 0.5 },
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private runCounter(): void {
    const start = 0;
    const end = this.target;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const eased = this.easeOutExpo(progress);
      const current = Math.round(start + (end - start) * eased);
      this.displayValue = this.prefix + current.toString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.displayValue = this.prefix + end.toString();
      }
    };

    requestAnimationFrame(step);
  }

  private easeOutExpo(x: number): number {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
}
