import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SectionHeaderComponent,
    FeatureCardComponent,
    BadgeComponent,
    AnimateOnScrollDirective,
  ],
  template: `
    <div class="page-enter">

      <!-- Page hero -->
      <section class="feat-hero section--dark" aria-labelledby="feat-title">
        <div class="feat-hero__bg" aria-hidden="true"></div>
        <div class="container feat-hero__inner">
          <app-badge text="Plataforma completa" variant="primary" icon="auto_awesome" />
          <h1 id="feat-title" class="feat-hero__title">
            Cada módulo construído para<br/>
            <span class="gradient-text">PMEs de e-commerce.</span>
          </h1>
          <p class="feat-hero__subtitle">
            Não é uma plataforma genérica adaptada. É uma solução construída do zero para o contexto logístico das PMEs brasileiras — com um preço que faz sentido.
          </p>
        </div>
      </section>

      <!-- Module 1: Roteirizador -->
      <section class="module section" aria-labelledby="roteirizador-title">
        <div class="container module__inner">
          <div class="module__content" [appAos]="'fade-right'">
            <app-badge text="Módulo 01" variant="primary" />
            <h2 id="roteirizador-title" class="module__title">Roteirizador Inteligente</h2>
            <p class="module__desc">
              Algoritmos VRP (Vehicle Routing Problem) de pesquisa operacional, adaptados ao contexto
              brasileiro: consideram condições de trânsito em tempo real, janelas de entrega, capacidade
              dos veículos e restrições de acesso.
            </p>
            <ul class="module__list">
              @for (item of features[0].items; track item) {
                <li class="module__list-item">
                  <span class="material-icons-round module__check">check_circle</span>
                  {{ item }}
                </li>
              }
            </ul>
            <a routerLink="/contato" class="module__cta">
              Testar gratuitamente
              <span class="material-icons-round">arrow_forward</span>
            </a>
          </div>
          <div class="module__visual module__visual--route" [appAos]="'fade-left'" aria-hidden="true">
            <svg viewBox="0 0 400 300" fill="none" class="module__svg">
              <rect width="400" height="300" fill="#F8FAFC" rx="16"/>
              <rect x="10" y="10" width="380" height="280" fill="#F1F5F9" rx="12"/>
              <!-- Streets -->
              <line x1="50" y1="0" x2="50" y2="300" stroke="#E2E8F0" stroke-width="1.5"/>
              <line x1="150" y1="0" x2="150" y2="300" stroke="#E2E8F0" stroke-width="1.5"/>
              <line x1="250" y1="0" x2="250" y2="300" stroke="#E2E8F0" stroke-width="1.5"/>
              <line x1="350" y1="0" x2="350" y2="300" stroke="#E2E8F0" stroke-width="1.5"/>
              <line x1="0" y1="75" x2="400" y2="75" stroke="#E2E8F0" stroke-width="1.5"/>
              <line x1="0" y1="150" x2="400" y2="150" stroke="#E2E8F0" stroke-width="1.5"/>
              <line x1="0" y1="225" x2="400" y2="225" stroke="#E2E8F0" stroke-width="1.5"/>
              <!-- Route -->
              <path d="M80,240 C100,220 120,200 150,180 C175,162 195,170 220,150 C245,130 260,110 290,95 C315,82 340,90 360,75" stroke="#1A73E8" stroke-width="3" fill="none" stroke-linecap="round"/>
              <!-- Delivery points -->
              <circle cx="80" cy="240" r="10" fill="#1A73E8" stroke="white" stroke-width="2.5"/>
              <text x="80" y="244" text-anchor="middle" fill="white" font-size="8" font-weight="700">A</text>
              <circle cx="150" cy="180" r="8" fill="#34A853" stroke="white" stroke-width="2"/>
              <text x="150" y="184" text-anchor="middle" fill="white" font-size="7" font-weight="700">B</text>
              <circle cx="220" cy="150" r="8" fill="#34A853" stroke="white" stroke-width="2"/>
              <text x="220" y="154" text-anchor="middle" fill="white" font-size="7" font-weight="700">C</text>
              <circle cx="290" cy="95" r="8" fill="#34A853" stroke="white" stroke-width="2"/>
              <text x="290" y="99" text-anchor="middle" fill="white" font-size="7" font-weight="700">D</text>
              <circle cx="360" cy="75" r="10" fill="#9334E6" stroke="white" stroke-width="2.5"/>
              <text x="360" y="79" text-anchor="middle" fill="white" font-size="8" font-weight="700">E</text>
              <!-- Info card -->
              <rect x="20" y="20" width="160" height="50" rx="8" fill="white" filter="drop-shadow(0 2px 8px rgba(0,0,0,.1))"/>
              <text x="40" y="41" fill="#1C1C1E" font-size="10" font-weight="700">Rota otimizada</text>
              <text x="40" y="57" fill="#34A853" font-size="9">▼ 32% menos km · 40min economizados</text>
            </svg>
          </div>
        </div>
      </section>

      <!-- Module 2: Gestão de Motoristas -->
      <section class="module module--alt section section--surface" aria-labelledby="drivers-title">
        <div class="container module__inner">
          <div class="module__visual module__visual--drivers" [appAos]="'fade-right'" aria-hidden="true">
            <div class="drivers-mock">
              @for (d of mockDrivers; track d.name) {
                <div class="drivers-mock__row">
                  <div class="drivers-mock__avatar" [style.background]="d.color">{{ d.initials }}</div>
                  <div class="drivers-mock__info">
                    <span class="drivers-mock__name">{{ d.name }}</span>
                    <span class="drivers-mock__region">{{ d.region }}</span>
                  </div>
                  <div class="drivers-mock__score" [style.color]="d.color">{{ d.score }}%</div>
                  <div class="drivers-mock__status" [class]="'drivers-mock__status--' + d.status">{{ d.statusLabel }}</div>
                </div>
              }
            </div>
          </div>
          <div class="module__content" [appAos]="'fade-left'">
            <app-badge text="Módulo 02" variant="success" />
            <h2 id="drivers-title" class="module__title">Gestão de Motoristas</h2>
            <p class="module__desc">
              Aloque motoristas com inteligência. O sistema considera região de atuação, histórico de
              performance, disponibilidade e carga horária. Conformidade CLT nativa, sem estresse.
            </p>
            <ul class="module__list">
              @for (item of features[1].items; track item) {
                <li class="module__list-item">
                  <span class="material-icons-round module__check">check_circle</span>
                  {{ item }}
                </li>
              }
            </ul>
            <a routerLink="/contato" class="module__cta">
              Testar gratuitamente
              <span class="material-icons-round">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Module 3: Analytics -->
      <section class="module section" aria-labelledby="analytics-title">
        <div class="container module__inner">
          <div class="module__content" [appAos]="'fade-right'">
            <app-badge text="Módulo 03" variant="purple" />
            <h2 id="analytics-title" class="module__title">Analytics & KPIs</h2>
            <p class="module__desc">
              Dashboard em tempo real com os indicadores que importam. Do custo por entrega à previsão
              de demanda por região e sazonalidade. Tome decisões com dados, não com achismo.
            </p>
            <ul class="module__list">
              @for (item of features[2].items; track item) {
                <li class="module__list-item">
                  <span class="material-icons-round module__check">check_circle</span>
                  {{ item }}
                </li>
              }
            </ul>
            <a routerLink="/contato" class="module__cta">
              Testar gratuitamente
              <span class="material-icons-round">arrow_forward</span>
            </a>
          </div>
          <div class="module__visual" [appAos]="'fade-left'" aria-hidden="true">
            <div class="analytics-mock">
              <div class="analytics-mock__header">Analytics Dashboard</div>
              <div class="analytics-mock__kpis">
                @for (kpi of analyticsKpis; track kpi.label) {
                  <div class="analytics-mock__kpi">
                    <span class="analytics-mock__kpi-val">{{ kpi.value }}</span>
                    <span class="analytics-mock__kpi-lbl">{{ kpi.label }}</span>
                    <span class="analytics-mock__kpi-chg" [class.up]="kpi.positive">{{ kpi.change }}</span>
                  </div>
                }
              </div>
              <div class="analytics-mock__bars">
                @for (b of analyticsBarData; track b.label) {
                  <div class="analytics-mock__bar-group">
                    <div class="analytics-mock__bar-fill" [style.height.%]="b.value" [style.background]="b.color"></div>
                    <span class="analytics-mock__bar-lbl">{{ b.label }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Module 4: Security -->
      <section class="module module--alt section section--surface" aria-labelledby="security-title">
        <div class="container module__inner">
          <div class="module__visual" [appAos]="'fade-right'" aria-hidden="true">
            <div class="security-mock">
              <div class="security-mock__icon">
                <span class="material-icons-round">security</span>
              </div>
              <h3 class="security-mock__title">Proteção em camadas</h3>
              @for (layer of securityLayers; track layer.label) {
                <div class="security-mock__layer">
                  <span class="material-icons-round security-mock__layer-icon">{{ layer.icon }}</span>
                  <div>
                    <div class="security-mock__layer-name">{{ layer.label }}</div>
                    <div class="security-mock__layer-desc">{{ layer.desc }}</div>
                  </div>
                  <span class="material-icons-round security-mock__layer-check">check_circle</span>
                </div>
              }
            </div>
          </div>
          <div class="module__content" [appAos]="'fade-left'">
            <app-badge text="Módulo 04" variant="alert" />
            <h2 id="security-title" class="module__title">Segurança & LGPD</h2>
            <p class="module__desc">
              Arquitetura Privacy by Design desde a fundação. Seus dados e os de seus clientes são
              protegidos por criptografia de ponta, controle de acesso granular e conformidade LGPD nativa.
            </p>
            <ul class="module__list">
              @for (item of features[3].items; track item) {
                <li class="module__list-item">
                  <span class="material-icons-round module__check">check_circle</span>
                  {{ item }}
                </li>
              }
            </ul>
            <a routerLink="/contato" class="module__cta">
              Ver documentação de segurança
              <span class="material-icons-round">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="feat-cta section" aria-labelledby="feat-cta-title">
        <div class="container feat-cta__inner" [appAos]="'zoom-in'">
          <h2 id="feat-cta-title">Pronto para transformar sua operação?</h2>
          <p>Comece grátis por 14 dias. Sem cartão de crédito.</p>
          <div class="feat-cta__btns">
            <a routerLink="/contato" class="btn-hero-primary">
              <span class="material-icons-round">rocket_launch</span>
              Começar agora
            </a>
            <a routerLink="/planos" class="btn-hero-outlined-dark">
              Ver planos e preços
              <span class="material-icons-round">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .feat-hero {
      position: relative;
      padding: 96px 0;
      overflow: hidden;
      &__bg {
        position: absolute; inset: 0;
        background: #0F172A;
        &::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 60% at 50% 50%, rgba(26,115,232,.12) 0%, transparent 70%);
        }
      }
      &__inner {
        position: relative; z-index: 1;
        display: flex; flex-direction: column; align-items: center;
        text-align: center; gap: 24px;
      }
      &__title {
        font-size: clamp(2.25rem, 4vw, 3.5rem); color: #F1F5F9;
        font-weight: 800; letter-spacing: -.04em; line-height: 1.15;
      }
      &__subtitle {
        font-size: 1.125rem; color: #94A3B8; max-width: 620px; line-height: 1.75;
      }
    }

    .module {
      &__inner {
        display: grid; grid-template-columns: 1fr 1fr;
        gap: 80px; align-items: center;
        @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 48px; }
      }
      &--alt &__inner { @media (min-width: 1025px) { } }
      &__content { display: flex; flex-direction: column; gap: 20px; }
      &__title { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 800; letter-spacing: -.03em; color: var(--color-text-primary); }
      &__desc { font-size: 1rem; color: var(--color-text-secondary); line-height: 1.8; }
      &__list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
      &__list-item { display: flex; align-items: flex-start; gap: 10px; font-size: 0.9375rem; color: var(--color-text-primary); }
      &__check { font-size: 18px; color: #34A853; flex-shrink: 0; margin-top: 2px; }
      &__cta {
        display: inline-flex; align-items: center; gap: 8px;
        color: var(--color-primary); font-weight: 700; font-size: 1rem;
        text-decoration: none; margin-top: 8px;
        .material-icons-round { font-size: 18px; }
        &:hover { gap: 12px; }
        transition: gap 200ms;
      }
      &__svg { width: 100%; border-radius: 16px; box-shadow: var(--shadow-xl); }
    }

    .drivers-mock {
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-lg);
      &__row {
        display: grid; grid-template-columns: 40px 1fr auto auto;
        align-items: center; gap: 14px; padding: 16px 20px;
        border-bottom: 1px solid var(--color-border);
        &:last-child { border-bottom: none; }
        &:hover { background: var(--color-surface-2); }
        transition: background 150ms;
      }
      &__avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .875rem; color: white; }
      &__name { font-weight: 600; font-size: .9rem; color: var(--color-text-primary); display: block; }
      &__region { font-size: .75rem; color: var(--color-text-secondary); }
      &__score { font-weight: 800; font-size: 1.1rem; }
      &__status { font-size: .75rem; font-weight: 600; padding: 4px 10px; border-radius: 8px; }
      &__status--active { background: rgba(52,168,83,.1); color: #34A853; }
      &__status--break { background: rgba(251,188,5,.1); color: #B45309; }
    }

    .analytics-mock {
      background: #1E293B; border-radius: 20px; padding: 24px;
      box-shadow: var(--shadow-xl); overflow: hidden;
      &__header { font-size: .8rem; color: #64748B; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; margin-bottom: 20px; }
      &__kpis { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
      &__kpi { background: #0F172A; border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 4px; }
      &__kpi-val { font-size: 1.5rem; font-weight: 800; color: #F1F5F9; letter-spacing: -.04em; }
      &__kpi-lbl { font-size: .7rem; color: #64748B; text-transform: uppercase; letter-spacing: .05em; }
      &__kpi-chg { font-size: .75rem; font-weight: 600; color: #64748B; &.up { color: #34A853; } }
      &__bars { display: flex; align-items: flex-end; gap: 12px; height: 100px; }
      &__bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
      &__bar-fill { width: 100%; border-radius: 6px 6px 3px 3px; min-height: 4px; }
      &__bar-lbl { font-size: .65rem; color: #64748B; }
    }

    .security-mock {
      background: var(--color-surface); border: 1px solid var(--color-border);
      border-radius: 20px; padding: 32px; box-shadow: var(--shadow-lg);
      &__icon { width: 80px; height: 80px; border-radius: 20px; background: linear-gradient(135deg, #1A73E8, #9334E6); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; .material-icons-round { font-size: 40px; color: white; } }
      &__title { font-size: 1.25rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 20px; }
      &__layer { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--color-border); &:last-child { border-bottom: none; } }
      &__layer-icon { font-size: 22px; color: var(--color-primary); }
      &__layer-name { font-size: .9rem; font-weight: 600; color: var(--color-text-primary); }
      &__layer-desc { font-size: .8rem; color: var(--color-text-secondary); }
      &__layer-check { font-size: 20px; color: #34A853; margin-left: auto; }
    }

    .feat-cta {
      background: var(--color-surface-2);
      &__inner { text-align: center; max-width: 600px; margin: 0 auto; h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); margin-bottom: 12px; } p { color: var(--color-text-secondary); margin-bottom: 32px; } }
      &__btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    }

    .btn-hero-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 24px; background: var(--color-primary); color: white;
      border-radius: 12px; font-size: .9375rem; font-weight: 700; text-decoration: none;
      transition: all 200ms;
      .material-icons-round { font-size: 18px; }
      &:hover { background: #1557B0; transform: translateY(-2px); }
    }

    .btn-hero-outlined-dark {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 24px; background: transparent; color: var(--color-text-primary);
      border: 2px solid var(--color-border); border-radius: 12px; font-size: .9375rem; font-weight: 700; text-decoration: none;
      transition: all 200ms;
      .material-icons-round { font-size: 18px; }
      &:hover { border-color: var(--color-primary); color: var(--color-primary); }
    }

    .gradient-text {
      background: linear-gradient(135deg, #1A73E8 0%, #9334E6 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
  `],
})
export class FeaturesPageComponent {
  readonly features = [
    {
      items: [
        'Algoritmo VRP com suporte a múltiplos veículos',
        'Integração com Google Maps, Waze e HERE Maps',
        'Janelas de entrega configuráveis por pedido',
        'Otimização por custo de combustível ou tempo',
        'Re-roteirização dinâmica em caso de imprevistos',
        'Suporte a restrições de peso e capacidade volumétrica',
      ],
    },
    {
      items: [
        'Painel individual de produtividade por motorista',
        'Controle automático de jornada (CLT)',
        'Alertas de hora extra e limite de carga',
        'Score de eficiência e ranking de desempenho',
        'Alocação inteligente por zona de atuação',
        'App mobile para motoristas (check-in/check-out)',
      ],
    },
    {
      items: [
        'Dashboard em tempo real atualizado por entrega',
        'KPIs: custo/entrega, tempo médio, taxa no prazo, faturamento',
        'Análise preditiva de demanda por região e sazonalidade',
        'Mapa de calor de entregas por bairro/cidade',
        'Relatórios automáticos (diário, semanal, mensal)',
        'Exportação em PDF e Excel',
      ],
    },
    {
      items: [
        'Autenticação JWT com refresh tokens seguros',
        'Autenticação de dois fatores (2FA) obrigatório para admins',
        'RBAC: Administrador, Gestor, Motorista, Visualizador',
        'Criptografia AES-256 de dados pessoais (LGPD)',
        'Audit trail completo de todas as ações',
        'DPA (Data Processing Agreement) incluso em todos os planos',
      ],
    },
  ];

  readonly mockDrivers = [
    { name: 'Carlos Silva', initials: 'CS', region: 'Zona Sul · SP', score: 94, color: '#1A73E8', status: 'active', statusLabel: 'Ativo' },
    { name: 'Ana Rodrigues', initials: 'AR', region: 'Zona Oeste · SP', score: 88, color: '#34A853', status: 'active', statusLabel: 'Ativo' },
    { name: 'Marco Souza', initials: 'MS', region: 'Centro · SP', score: 76, color: '#FBBC05', status: 'break', statusLabel: 'Pausa' },
    { name: 'Julia Ferreira', initials: 'JF', region: 'Zona Norte · SP', score: 100, color: '#9334E6', status: 'active', statusLabel: 'Ativo' },
    { name: 'Pedro Lima', initials: 'PL', region: 'ABC · SP', score: 82, color: '#EA4335', status: 'active', statusLabel: 'Ativo' },
  ];

  readonly analyticsKpis = [
    { value: 'R$ 8,40', label: 'Custo/entrega', change: '▼ 23%', positive: true },
    { value: '96,8%', label: 'No prazo', change: '▲ 12%', positive: true },
    { value: '38 min', label: 'Tempo médio', change: '▼ 18%', positive: true },
    { value: 'R$ 47,8k', label: 'Faturamento', change: '▲ 31%', positive: true },
  ];

  readonly analyticsBarData = [
    { label: 'Jan', value: 45, color: '#1A73E8' },
    { label: 'Fev', value: 60, color: '#1A73E8' },
    { label: 'Mar', value: 55, color: '#1A73E8' },
    { label: 'Abr', value: 75, color: '#1A73E8' },
    { label: 'Mai', value: 70, color: '#1A73E8' },
    { label: 'Jun', value: 90, color: '#9334E6' },
  ];

  readonly securityLayers = [
    { icon: 'vpn_key', label: 'JWT + 2FA', desc: 'Tokens seguros com expiração configurável' },
    { icon: 'admin_panel_settings', label: 'RBAC granular', desc: '4 níveis de acesso por papel' },
    { icon: 'lock', label: 'Criptografia AES-256', desc: 'Dados pessoais criptografados em repouso' },
    { icon: 'gavel', label: 'Conformidade LGPD', desc: 'Privacy by Design + DPA incluso' },
    { icon: 'history', label: 'Audit Trail', desc: 'Registro imutável de todas as ações' },
  ];
}
