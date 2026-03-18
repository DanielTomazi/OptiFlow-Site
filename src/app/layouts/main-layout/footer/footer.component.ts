import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface FooterLink { label: string; path: string; external?: boolean; }
interface FooterColumn { heading: string; links: FooterLink[]; }

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer" role="contentinfo">
      <div class="footer__inner container">
        <!-- Brand -->
        <div class="footer__brand">
          <a routerLink="/" class="footer__logo" aria-label="OptiFlow — página inicial">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="url(#footerLogoGrad)"/>
              <path d="M8 16 L16 8 L24 16 L16 24 Z" stroke="white" stroke-width="2.5" fill="none"/>
              <circle cx="16" cy="16" r="4" fill="white"/>
              <defs>
                <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stop-color="#1A73E8"/>
                  <stop offset="100%" stop-color="#9334E6"/>
                </linearGradient>
              </defs>
            </svg>
            <span class="footer__brand-name">Opti<span>Flow</span></span>
          </a>
          <p class="footer__tagline">
            Democratizando o acesso à tecnologia avançada de logística para PMEs de e-commerce.
          </p>
          <!-- Social Links -->
          <div class="footer__social">
            @for (s of socials; track s.label) {
              <a
                [href]="s.url"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__social-link"
                [attr.aria-label]="s.label + ' da OptiFlow'"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" class="footer__social-icon" aria-hidden="true">
                  <path [attr.d]="s.icon"/>
                </svg>
              </a>
            }
          </div>
          <!-- LGPD Badge -->
          <div class="footer__lgpd">
            <span class="material-icons-round footer__lgpd-icon">security</span>
            <span>LGPD Compliant · Privacy by Design</span>
          </div>
        </div>

        <!-- Columns -->
        @for (col of columns; track col.heading) {
          <div class="footer__col">
            <h3 class="footer__col-heading">{{ col.heading }}</h3>
            <ul class="footer__col-list">
              @for (link of col.links; track link.label) {
                <li>
                  @if (link.external) {
                    <a [href]="link.path" target="_blank" rel="noopener noreferrer" class="footer__link">
                      {{ link.label }}
                    </a>
                  } @else {
                    <a [routerLink]="link.path" class="footer__link">{{ link.label }}</a>
                  }
                </li>
              }
            </ul>
          </div>
        }
      </div>

      <!-- Bottom Bar -->
      <div class="footer__bottom">
        <div class="container footer__bottom-inner">
          <p class="footer__copy">
            &copy; {{ year }} OptiFlow Logística Inteligente LTDA. Todos os direitos reservados.
          </p>
          <div class="footer__legal-links">
            <a routerLink="/privacidade" class="footer__link">Política de Privacidade</a>
            <a routerLink="/termos" class="footer__link">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #0F172A;
      color: #CBD5E1;
      border-top: 1px solid rgba(255,255,255,.06);
      margin-top: auto;
    }

    .footer__inner {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 48px;
      padding-top: 64px;
      padding-bottom: 64px;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }

    /* Brand */
    .footer__logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      margin-bottom: 16px;
    }

    .footer__brand-name {
      font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
      font-size: 1.4rem;
      font-weight: 800;
      color: #F1F5F9;
      letter-spacing: -0.03em;

      span { color: #60A5FA; }
    }

    .footer__tagline {
      font-size: 0.9rem;
      color: #64748B;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .footer__social {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }

    .footer__social-link {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.08);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94A3B8;
      transition: all 200ms;
      text-decoration: none;

      &:hover {
        background: rgba(26,115,232,.2);
        border-color: rgba(26,115,232,.3);
        color: #60A5FA;
        transform: translateY(-2px);
      }

      &:focus-visible { outline: 3px solid #60A5FA; outline-offset: 2px; }
    }

    .footer__social-icon { width: 16px; height: 16px; }

    .footer__lgpd {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      color: #34A853;
      font-weight: 600;
      padding: 6px 12px;
      background: rgba(52,168,83,.1);
      border: 1px solid rgba(52,168,83,.2);
      border-radius: 8px;
      width: fit-content;
    }

    .footer__lgpd-icon { font-size: 16px; }

    /* Columns */
    .footer__col-heading {
      font-size: 0.8125rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #94A3B8;
      margin-bottom: 20px;
    }

    .footer__col-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer__link {
      font-size: 0.9rem;
      color: #64748B;
      text-decoration: none;
      transition: color 150ms;

      &:hover { color: #F1F5F9; }
      &:focus-visible { outline: 2px solid #60A5FA; border-radius: 3px; }
    }

    /* Bottom bar */
    .footer__bottom {
      border-top: 1px solid rgba(255,255,255,.06);
      padding: 20px 0;
    }

    .footer__bottom-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;

      @media (max-width: 640px) { flex-direction: column; text-align: center; }
    }

    .footer__copy {
      font-size: 0.8125rem;
      color: #475569;
    }

    .footer__legal-links {
      display: flex;
      gap: 16px;
      .footer__link { font-size: 0.8125rem; }
    }
  `],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly socials = [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/daniel-tomazi/',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/DanielTomazi',
      icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    },
    {
      label: 'Instagram',
      url: 'https://instagram.com/danieltomazii',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
  ];

  readonly columns: FooterColumn[] = [
    {
      heading: 'Produto',
      links: [
        { label: 'Funcionalidades', path: '/funcionalidades' },
        { label: 'Planos e Preços', path: '/planos' },
        { label: 'Roteirizador', path: '/funcionalidades' },
        { label: 'Analytics & KPIs', path: '/funcionalidades' },
        { label: 'Integrações', path: '/funcionalidades' },
      ],
    },
    {
      heading: 'Empresa',
      links: [
        { label: 'Sobre nós', path: '/sobre' },
        { label: 'Blog', path: '/blog' },
        { label: 'Cases de sucesso', path: '/blog' },
        { label: 'Imprensa', path: '/sobre' },
        { label: 'Contato', path: '/contato' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Política de Privacidade', path: '/privacidade' },
        { label: 'Termos de Uso', path: '/termos' },
        { label: 'Política de Cookies', path: '/privacidade' },
        { label: 'DPA (LGPD)', path: '/privacidade' },
      ],
    },
  ];
}
