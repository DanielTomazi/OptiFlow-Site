import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="testimonial" [attr.aria-label]="'Depoimento de ' + authorName">
      <div class="testimonial__stars" aria-label="5 estrelas">
        @for (s of [1,2,3,4,5]; track s) {
          <span class="material-icons-round testimonial__star">star</span>
        }
      </div>
      <blockquote class="testimonial__quote">
        "{{ quote }}"
      </blockquote>
      <footer class="testimonial__footer">
        <div
          class="testimonial__avatar"
          [style.background]="avatarBg"
          [attr.aria-hidden]="true"
        >
          {{ initials }}
        </div>
        <div class="testimonial__author">
          <span class="testimonial__name">{{ authorName }}</span>
          <span class="testimonial__role">{{ role }}, {{ company }}</span>
        </div>
      </footer>
    </article>
  `,
  styles: [`
    .testimonial {
      background: var(--color-surface, #fff);
      border: 1px solid var(--color-border, #E2E8F0);
      border-radius: 20px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      transition: all 250ms;

      &:hover {
        box-shadow: var(--shadow-lg, 0 10px 15px rgba(0,0,0,.1));
        transform: translateY(-4px);
      }
    }

    .testimonial__stars {
      display: flex;
      gap: 2px;
    }

    .testimonial__star {
      font-size: 18px;
      color: #FBBC05;
    }

    .testimonial__quote {
      font-size: 1rem;
      line-height: 1.8;
      color: var(--color-text-primary);
      font-style: italic;
      flex: 1;
      quotes: none;
    }

    .testimonial__footer {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .testimonial__avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1rem;
      color: #fff;
      flex-shrink: 0;
    }

    .testimonial__author {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .testimonial__name {
      font-weight: 700;
      font-size: 0.9375rem;
      color: var(--color-text-primary);
    }

    .testimonial__role {
      font-size: 0.8125rem;
      color: var(--color-text-secondary);
    }
  `],
})
export class TestimonialCardComponent {
  @Input({ required: true }) quote!: string;
  @Input({ required: true }) authorName!: string;
  @Input({ required: true }) role!: string;
  @Input({ required: true }) company!: string;
  @Input() avatarBg = '#1A73E8';

  get initials(): string {
    return this.authorName
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }
}
