import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-minimal-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="minimal-layout">
      <header class="minimal-header" role="banner">
        <div class="container minimal-header__inner">
          <a routerLink="/" class="minimal-header__logo" aria-label="Voltar para o início">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="url(#minLogoGrad)"/>
              <path d="M8 16 L16 8 L24 16 L16 24 Z" stroke="white" stroke-width="2.5" fill="none"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
              <defs>
                <linearGradient id="minLogoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stop-color="#1A73E8"/>
                  <stop offset="100%" stop-color="#9334E6"/>
                </linearGradient>
              </defs>
            </svg>
            <span>Opti<strong>Flow</strong></span>
          </a>
          <a routerLink="/" class="minimal-header__back">
            <span class="material-icons-round">arrow_back</span>
            Voltar ao site
          </a>
        </div>
      </header>
      <main id="main-content" class="minimal-main">
        <router-outlet />
      </main>
      <footer class="minimal-footer">
        <div class="container">
          <p>&copy; {{ year }} OptiFlow Logística Inteligente.
            <a routerLink="/privacidade">Privacidade</a> ·
            <a routerLink="/termos">Termos</a>
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .minimal-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .minimal-header {
      border-bottom: 1px solid var(--color-border);
      background: var(--color-surface);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .minimal-header__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
    }

    .minimal-header__logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text-primary);
      letter-spacing: -0.02em;

      strong { color: var(--color-primary); }
    }

    .minimal-header__back {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid var(--color-border);
      transition: all 150ms;

      &:hover {
        color: var(--color-primary);
        border-color: var(--color-primary);
        background: rgba(26,115,232,.04);
      }

      .material-icons-round { font-size: 16px; }
    }

    .minimal-main { flex: 1; }

    .minimal-footer {
      border-top: 1px solid var(--color-border);
      padding: 20px 0;

      p {
        font-size: 0.8125rem;
        color: var(--color-text-muted);
        text-align: center;
      }

      a {
        color: var(--color-text-secondary);
        &:hover { color: var(--color-primary); }
      }
    }
  `],
})
export class MinimalLayoutComponent {
  readonly year = new Date().getFullYear();
}
