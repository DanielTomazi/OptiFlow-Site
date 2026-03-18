import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { trigger, style, animate, transition } from '@angular/animations';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonComponent],
  animations: [
    trigger('mobileMenu', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-12px)' }),
        animate('250ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(-12px)' })),
      ]),
    ]),
  ],
  template: `
    <header
      class="header"
      [class.header--scrolled]="scrolled()"
      role="banner"
    >
      <div class="header__inner container">
        <!-- Logo -->
        <a routerLink="/" class="header__logo" aria-label="OptiFlow — página inicial">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="url(#logoGrad)"/>
            <path d="M8 16 L16 8 L24 16 L16 24 Z" stroke="white" stroke-width="2.5" fill="none"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stop-color="#1A73E8"/>
                <stop offset="100%" stop-color="#9334E6"/>
              </linearGradient>
            </defs>
          </svg>
          <span class="header__brand">Opti<span class="header__brand-flow">Flow</span></span>
        </a>

        <!-- Desktop Nav -->
        <nav class="header__nav" aria-label="Navegação principal">
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="header__nav-link--active"
              [routerLinkActiveOptions]="{ exact: item.path === '/' }"
              class="header__nav-link"
              [attr.aria-current]="isActive(item.path) ? 'page' : null"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Actions -->
        <div class="header__actions">
          <!-- Dark mode toggle -->
          <button
            class="header__theme-btn"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'"
            [attr.aria-pressed]="theme.theme() === 'dark'"
          >
            <span class="material-icons-round">
              {{ theme.theme() === 'dark' ? 'light_mode' : 'dark_mode' }}
            </span>
          </button>

          <a routerLink="/contato" class="header__btn-enter" aria-label="Entrar na plataforma">
            Entrar
          </a>
          <a routerLink="/contato" class="header__btn-demo">
            <span class="material-icons-round" aria-hidden="true">calendar_month</span>
            Agendar Demo
          </a>

          <!-- Hamburger -->
          <button
            class="header__hamburger"
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-menu"
            aria-label="Menu de navegação"
          >
            <span class="material-icons-round">{{ menuOpen() ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (menuOpen()) {
        <nav
          id="mobile-menu"
          class="header__mobile"
          [attr.aria-label]="'Navegação mobile'"
          [@mobileMenu]
        >
          @for (item of navItems; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="header__mobile-link--active"
              class="header__mobile-link"
              (click)="menuOpen.set(false)"
            >
              {{ item.label }}
            </a>
          }
          <div class="header__mobile-actions">
            <a routerLink="/contato" class="header__btn-enter" (click)="menuOpen.set(false)">
              Entrar
            </a>
            <a routerLink="/contato" class="header__btn-demo" (click)="menuOpen.set(false)">
              <span class="material-icons-round" aria-hidden="true">calendar_month</span>
              Agendar Demo
            </a>
          </div>
        </nav>
      }
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-header, 100);
      transition: background 300ms, box-shadow 300ms, border-color 300ms;
      border-bottom: 1px solid transparent;
    }

    .header--scrolled {
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom-color: var(--color-border, #E2E8F0);
      box-shadow: 0 1px 20px rgba(0,0,0,.06);
    }

    [data-theme="dark"] .header--scrolled {
      background: rgba(15,23,42,0.9);
      border-bottom-color: rgba(255,255,255,.08);
    }

    .header__inner {
      display: flex;
      align-items: center;
      height: 72px;
      gap: 32px;
    }

    /* Logo */
    .header__logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }

    .header__brand {
      font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
      font-size: 1.375rem;
      font-weight: 800;
      color: var(--color-text-primary);
      letter-spacing: -0.03em;
    }

    .header__brand-flow {
      color: var(--color-primary, #1A73E8);
    }

    /* Desktop Nav */
    .header__nav {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;

      @media (max-width: 1024px) { display: none; }
    }

    .header__nav-link {
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      text-decoration: none;
      transition: all 150ms;

      &:hover {
        color: var(--color-text-primary);
        background: var(--color-surface-2, #F1F5F9);
      }

      &--active {
        color: var(--color-primary, #1A73E8) !important;
        font-weight: 600;
        background: rgba(26,115,232,.08) !important;
      }
    }

    /* Actions */
    .header__actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }

    .header__theme-btn {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: none;
      border: 1px solid var(--color-border, #E2E8F0);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-secondary);
      transition: all 150ms;

      &:hover {
        background: var(--color-surface-2, #F1F5F9);
        color: var(--color-text-primary);
      }

      &:focus-visible {
        outline: 3px solid var(--color-primary);
        outline-offset: 2px;
      }

      .material-icons-round { font-size: 20px; }
    }

    .header__btn-enter {
      padding: 9px 18px;
      border-radius: 9px;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-text-primary);
      text-decoration: none;
      border: 1px solid var(--color-border, #E2E8F0);
      transition: all 150ms;

      &:hover {
        background: var(--color-surface-2, #F1F5F9);
        border-color: var(--color-text-muted);
      }

      @media (max-width: 1024px) { display: none; }
    }

    .header__btn-demo {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 9px 18px;
      border-radius: 9px;
      font-size: 0.9rem;
      font-weight: 700;
      color: #fff;
      background: var(--color-primary, #1A73E8);
      text-decoration: none;
      box-shadow: 0 3px 12px rgba(26,115,232,.32);
      transition: all 200ms;

      &:hover {
        background: #1557B0;
        transform: translateY(-1px);
        box-shadow: 0 5px 18px rgba(26,115,232,.42);
      }

      .material-icons-round { font-size: 16px; }

      @media (max-width: 1024px) { display: none; }
    }

    /* Hamburger */
    .header__hamburger {
      display: none;
      width: 40px;
      height: 40px;
      border: 1px solid var(--color-border, #E2E8F0);
      border-radius: 10px;
      background: none;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      color: var(--color-text-primary);
      transition: background 150ms;

      &:hover { background: var(--color-surface-2, #F1F5F9); }
      &:focus-visible { outline: 3px solid var(--color-primary); outline-offset: 2px; }

      .material-icons-round { font-size: 22px; }

      @media (max-width: 1024px) { display: flex; }
    }

    /* Mobile Menu */
    .header__mobile {
      display: flex;
      flex-direction: column;
      padding: 16px 24px 24px;
      background: var(--color-surface, #fff);
      border-top: 1px solid var(--color-border, #E2E8F0);
      box-shadow: 0 8px 24px rgba(0,0,0,.08);

      @media (min-width: 1025px) { display: none; }
    }

    .header__mobile-link {
      padding: 13px 8px;
      font-size: 1rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      text-decoration: none;
      border-bottom: 1px solid var(--color-border, #E2E8F0);
      transition: color 150ms;

      &:hover, &--active { color: var(--color-primary, #1A73E8); font-weight: 600; }
    }

    .header__mobile-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;

      .header__btn-enter,
      .header__btn-demo {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
  `],
})
export class HeaderComponent {
  theme = inject(ThemeService);
  scrolled = signal(false);
  menuOpen = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Funcionalidades', path: '/funcionalidades' },
    { label: 'Planos', path: '/planos' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Blog', path: '/blog' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 16);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  isActive(path: string): boolean {
    if (typeof window === 'undefined') return false;
    return path === '/'
      ? window.location.pathname === '/'
      : window.location.pathname.startsWith(path);
  }
}
