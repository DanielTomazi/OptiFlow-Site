import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { PricingCardComponent, PricingFeature } from '../../shared/components/pricing-card/pricing-card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { trigger, style, animate, transition } from '@angular/animations';

interface FaqItem { question: string; answer: string; open: boolean; }

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, PricingCardComponent, BadgeComponent, AnimateOnScrollDirective],
  animations: [
    trigger('faqBody', [
      transition(':enter', [style({ height: 0, opacity: 0 }), animate('250ms ease', style({ height: '*', opacity: 1 }))]),
      transition(':leave', [animate('200ms ease', style({ height: 0, opacity: 0 }))]),
    ]),
  ],
  template: `
    <div class="page-enter">

      <!-- Hero -->
      <section class="pricing-hero section--dark" aria-labelledby="pricing-title">
        <div class="container pricing-hero__inner">
          <app-badge text="Preços simples e transparentes" variant="success" icon="payments" />
          <h1 id="pricing-title" class="pricing-hero__title">
            Planos para cada<br/><span class="gradient-text">momento do negócio.</span>
          </h1>
          <p class="pricing-hero__subtitle">Sem taxa de setup. Sem surpresas. Cancele quando quiser.</p>

          <!-- Toggle -->
          <div class="pricing-toggle" role="group" aria-label="Frequência de cobrança">
            <button
              class="pricing-toggle__btn"
              [class.active]="!annual()"
              (click)="annual.set(false)"
              [attr.aria-pressed]="!annual()"
            >Mensal</button>
            <button
              class="pricing-toggle__btn"
              [class.active]="annual()"
              (click)="annual.set(true)"
              [attr.aria-pressed]="annual()"
            >
              Anual
              <span class="pricing-toggle__badge">-20%</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Plans -->
      <section class="pricing-plans section" aria-labelledby="plans-title">
        <div class="container">
          <div class="pricing-plans__grid" [appAos]="'fade-up'">
            <app-pricing-card
              planName="Starter"
              description="Para operações iniciais com pequena frota."
              [price]="annual() ? 158 : 197"
              [annualPrice]="158"
              [features]="starterFeatures"
              ctaLabel="Começar grátis 14 dias"
              (ctaClick)="onPlanSelected($event)"
            />
            <app-pricing-card
              planName="Professional"
              description="Para PMEs em crescimento acelerado."
              [price]="annual() ? 318 : 397"
              [annualPrice]="318"
              [features]="professionalFeatures"
              [highlighted]="true"
              badge="Mais popular"
              ctaLabel="Começar agora"
              (ctaClick)="onPlanSelected($event)"
            />
            <app-pricing-card
              planName="Enterprise"
              description="Para grandes operações com necessidades complexas."
              [features]="enterpriseFeatures"
              [enterprise]="true"
              ctaLabel="Falar com vendas"
              (ctaClick)="onPlanSelected($event)"
            />
          </div>

          <!-- Comparison note -->
          <div class="pricing-plans__note" [appAos]="'fade-up'" [aosDelay]="200">
            <span class="material-icons-round">info</span>
            Todos os planos incluem periodo gratuito de 14 dias. LGPD DPA incluso. Dados hospedados no Brasil.
          </div>
        </div>
      </section>

      <!-- Feature comparison table -->
      <section class="pricing-table section section--surface" aria-labelledby="comparison-title">
        <div class="container">
          <app-section-header
            eyebrow="Comparativo completo"
            title="O que está incluso"
            titleHighlight="em cada plano."
            [appAos]="'fade-up'"
          />

          <div class="comparison-table" [appAos]="'fade-up'" [aosDelay]="100" role="table" aria-label="Comparativo de funcionalidades por plano">
            <!-- Header -->
            <div class="comparison-table__header" role="row">
              <div role="columnheader">Funcionalidade</div>
              <div role="columnheader">Starter</div>
              <div role="columnheader">Professional</div>
              <div role="columnheader">Enterprise</div>
            </div>
            @for (row of comparisonRows; track row.feature) {
              <div class="comparison-table__row" [class.comparison-table__row--section]="row.isSection" role="row">
                <div class="comparison-table__feature" role="cell">{{ row.feature }}</div>
                @if (!row.isSection) {
                  <div class="comparison-table__cell" role="cell">
                    <ng-container [ngTemplateOutlet]="cellTpl" [ngTemplateOutletContext]="{val: row.starter}"/>
                  </div>
                  <div class="comparison-table__cell comparison-table__cell--highlight" role="cell">
                    <ng-container [ngTemplateOutlet]="cellTpl" [ngTemplateOutletContext]="{val: row.professional}"/>
                  </div>
                  <div class="comparison-table__cell" role="cell">
                    <ng-container [ngTemplateOutlet]="cellTpl" [ngTemplateOutletContext]="{val: row.enterprise}"/>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="pricing-faq section" aria-labelledby="faq-title">
        <div class="container pricing-faq__inner">
          <app-section-header
            eyebrow="Dúvidas frequentes"
            title="Perguntas"
            titleHighlight="e respostas."
            [appAos]="'fade-up'"
          />
          <div class="faq-list" [appAos]="'fade-up'" [aosDelay]="100">
            @for (item of faqItems; track item.question; let i = $index) {
              <div class="faq-item" [class.faq-item--open]="item.open">
                <button
                  class="faq-item__trigger"
                  (click)="toggleFaq(i)"
                  [attr.aria-expanded]="item.open"
                  [attr.aria-controls]="'faq-' + i"
                  [id]="'faq-btn-' + i"
                >
                  {{ item.question }}
                  <span class="material-icons-round faq-icon">{{ item.open ? 'remove' : 'add' }}</span>
                </button>
                @if (item.open) {
                  <div
                    class="faq-item__body"
                    [@faqBody]
                    [id]="'faq-' + i"
                    [attr.aria-labelledby]="'faq-btn-' + i"
                    role="region"
                  >
                    <p>{{ item.answer }}</p>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA Final -->
      <section class="pricing-cta section section--dark" aria-labelledby="pricing-cta-title">
        <div class="container pricing-cta__inner" [appAos]="'zoom-in'">
          <h2 id="pricing-cta-title">Ainda com dúvidas?</h2>
          <p>Nossa equipe é especializada em logística de PMEs. Fale conosco e responderemos em até 2h.</p>
          <a routerLink="/contato" class="pricing-cta__btn">
            <span class="material-icons-round">calendar_month</span>
            Agendar uma conversa
          </a>
        </div>
      </section>

    </div>

    <!-- Cell template -->
    <ng-template #cellTpl let-val="val">
      @if (val === true) {
        <span class="material-icons-round cell-check" aria-label="Incluído">check_circle</span>
      } @else if (val === false) {
        <span class="material-icons-round cell-x" aria-label="Não incluído">cancel</span>
      } @else {
        <span class="cell-text">{{ val }}</span>
      }
    </ng-template>
  `,
  styles: [`
    .gradient-text { background: linear-gradient(135deg,#1A73E8,#9334E6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    .pricing-hero {
      padding: 80px 0;
      background: #0F172A;
      &__inner { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px; position: relative; z-index: 1; }
      &__title { font-size: clamp(2rem, 4vw, 3.25rem); color: #F1F5F9; font-weight: 800; letter-spacing: -.04em; line-height: 1.15; }
      &__subtitle { font-size: 1.0625rem; color: #94A3B8; }
    }

    .pricing-toggle {
      display: flex; gap: 4px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); padding: 4px; border-radius: 12px;
      &__btn {
        padding: 10px 20px; border-radius: 9px; border: none; background: transparent; color: #94A3B8;
        font-family: var(--font-sans,'Inter',sans-serif); font-size: .9375rem; font-weight: 600; cursor: pointer; transition: all 200ms;
        display: flex; align-items: center; gap: 8px;
        &.active { background: white; color: #1C1C1E; }
        &:focus-visible { outline: 3px solid #60A5FA; }
      }
      &__badge { background: linear-gradient(135deg,#34A853,#1A73E8); color: white; font-size: .7rem; font-weight: 700; padding: 2px 8px; border-radius: 9999px; }
    }

    .pricing-plans {
      &__grid {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start;
        @media (max-width: 1024px) { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; }
      }
      &__note {
        display: flex; align-items: center; gap: 8px; justify-content: center; margin-top: 24px;
        font-size: .875rem; color: var(--color-text-secondary);
        .material-icons-round { font-size: 18px; color: var(--color-primary); }
      }
    }

    .comparison-table {
      border: 1px solid var(--color-border); border-radius: 16px; overflow: hidden;
      &__header, &__row {
        display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
        @media (max-width: 768px) { grid-template-columns: 2fr 1fr 1fr 1fr; font-size: .8rem; }
      }
      &__header {
        background: var(--color-surface-2); padding: 14px 20px;
        font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--color-text-secondary);
      }
      &__row { padding: 14px 20px; border-top: 1px solid var(--color-border); background: var(--color-surface); align-items: center; &--section { background: var(--color-surface-2); } }
      &__feature { font-size: .9rem; color: var(--color-text-primary); font-weight: 500; }
      &__cell { display: flex; justify-content: center; align-items: center; }
      &__cell--highlight { background: rgba(26,115,232,.03); }
    }

    .cell-check { font-size: 18px; color: #34A853; }
    .cell-x { font-size: 18px; color: var(--color-text-muted); }
    .cell-text { font-size: .875rem; color: var(--color-text-primary); font-weight: 500; }

    .faq-list { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 0; border: 1px solid var(--color-border); border-radius: 16px; overflow: hidden; }
    .faq-item {
      border-bottom: 1px solid var(--color-border); background: var(--color-surface);
      &:last-child { border-bottom: none; }
      &--open { background: var(--color-surface-2); }
      &__trigger {
        display: flex; align-items: center; justify-content: space-between; gap: 16px;
        width: 100%; padding: 20px 24px; border: none; background: none; text-align: left;
        font-family: var(--font-sans,'Inter',sans-serif); font-size: 1rem; font-weight: 600;
        color: var(--color-text-primary); cursor: pointer; transition: background 150ms;
        &:hover { background: var(--color-surface-2); }
        &:focus-visible { outline: 3px solid var(--color-primary); outline-offset: -3px; }
      }
      &__body { padding: 0 24px 20px; overflow: hidden; p { font-size: .9375rem; color: var(--color-text-secondary); line-height: 1.75; } }
    }

    .faq-icon { font-size: 20px; color: var(--color-text-muted); flex-shrink: 0; }

    .pricing-cta {
      &__inner { max-width: 600px; margin: 0 auto; text-align: center; h2 { font-size: clamp(1.75rem,3vw,2.5rem); color:#F1F5F9; margin-bottom:16px; } p { color: #94A3B8; margin-bottom: 32px; } }
      &__btn {
        display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px;
        background: var(--color-primary); color: white; border-radius: 12px;
        font-size: 1.0625rem; font-weight: 700; text-decoration: none; transition: all 200ms;
        box-shadow: 0 6px 20px rgba(26,115,232,.4);
        .material-icons-round { font-size: 20px; }
        &:hover { background: #1557B0; transform: translateY(-2px); }
      }
    }
  `],
})
export class PricingComponent {
  annual = signal(false);

  onPlanSelected(plan: string): void {
    console.log('[Pricing] Plan selected:', plan);
  }

  readonly starterFeatures: PricingFeature[] = [
    { label: 'Até 5 motoristas', included: true },
    { label: '500 pedidos/mês', included: true },
    { label: 'Rotas otimizadas', included: true },
    { label: 'Analytics básico', included: true },
    { label: '2 integrações', included: true },
    { label: 'Analytics avançado', included: false },
    { label: 'Análise preditiva', included: false },
    { label: 'Suporte por chat', included: true },
    { label: 'SLA garantido', included: false },
    { label: 'LGPD DPA incluso', included: true },
  ];

  readonly professionalFeatures: PricingFeature[] = [
    { label: 'Até 20 motoristas', included: true, highlight: true },
    { label: '5.000 pedidos/mês', included: true, highlight: true },
    { label: 'Rotas otimizadas', included: true },
    { label: 'Analytics básico', included: true },
    { label: 'Todas as integrações', included: true, highlight: true },
    { label: 'Analytics avançado', included: true, highlight: true },
    { label: 'Análise preditiva', included: true, highlight: true },
    { label: 'Chat + e-mail', included: true },
    { label: 'SLA 99,5%', included: true },
    { label: 'LGPD DPA incluso', included: true },
  ];

  readonly enterpriseFeatures: PricingFeature[] = [
    { label: 'Motoristas ilimitados', included: true, highlight: true },
    { label: 'Pedidos ilimitados', included: true, highlight: true },
    { label: 'Rotas otimizadas', included: true },
    { label: 'Analytics avançado', included: true },
    { label: 'Integrações + custom', included: true, highlight: true },
    { label: 'Análise preditiva IA', included: true, highlight: true },
    { label: 'Gerente dedicado', included: true, highlight: true },
    { label: 'SLA 99,9%', included: true, highlight: true },
    { label: 'LGPD DPA + suporte jurídico', included: true, highlight: true },
  ];

  readonly comparisonRows = [
    { feature: 'Capacidade', isSection: true, starter: null, professional: null, enterprise: null },
    { feature: 'Motoristas incluídos', starter: 'até 5', professional: 'até 20', enterprise: 'Ilimitados' },
    { feature: 'Pedidos/mês', starter: '500', professional: '5.000', enterprise: 'Ilimitados' },
    { feature: 'Rotas otimizadas/mês', starter: '50', professional: '500', enterprise: 'Ilimitadas' },
    { feature: 'Roteirização', isSection: true, starter: null, professional: null, enterprise: null },
    { feature: 'Algoritmo VRP básico', starter: true, professional: true, enterprise: true },
    { feature: 'Re-roteirização dinâmica', starter: false, professional: true, enterprise: true },
    { feature: 'Multi-depósito', starter: false, professional: true, enterprise: true },
    { feature: 'Analytics', isSection: true, starter: null, professional: null, enterprise: null },
    { feature: 'Dashboard básico', starter: true, professional: true, enterprise: true },
    { feature: 'Analytics avançado', starter: false, professional: true, enterprise: true },
    { feature: 'Análise preditiva de demanda', starter: false, professional: true, enterprise: true },
    { feature: 'Relatórios customizados', starter: false, professional: false, enterprise: true },
    { feature: 'Integrações', isSection: true, starter: null, professional: null, enterprise: null },
    { feature: 'Plataformas nativas', starter: '2', professional: 'Todas', enterprise: 'Todas' },
    { feature: 'API & Webhooks', starter: false, professional: true, enterprise: true },
    { feature: 'Integração custom (SSO, ERP)', starter: false, professional: false, enterprise: true },
    { feature: 'Suporte & SLA', isSection: true, starter: null, professional: null, enterprise: null },
    { feature: 'Suporte por chat', starter: true, professional: true, enterprise: true },
    { feature: 'Suporte por e-mail', starter: false, professional: true, enterprise: true },
    { feature: 'Gerente de conta dedicado', starter: false, professional: false, enterprise: true },
    { feature: 'SLA de uptime', starter: '—', professional: '99,5%', enterprise: '99,9%' },
    { feature: 'LGPD', isSection: true, starter: null, professional: null, enterprise: null },
    { feature: 'LGPD DPA incluso', starter: true, professional: true, enterprise: true },
    { feature: 'Suporte jurídico LGPD', starter: false, professional: false, enterprise: true },
  ];

  faqItems: FaqItem[] = [
    { question: 'Existe período gratuito de teste?', answer: 'Sim! Todos os planos incluem 14 dias gratuitos sem necessidade de cartão de crédito. Você pode testar todas as funcionalidades do plano escolhido.', open: false },
    { question: 'Posso mudar de plano depois?', answer: 'Sim, você pode fazer upgrade ou downgrade a qualquer momento. No caso de upgrade, a diferença é cobrada proporcionalmente. Em downgrade, o crédito é aplicado nas próximas faturas.', open: false },
    { question: 'O que acontece se eu exceder o limite de pedidos?', answer: 'Você receberá uma notificação e poderá fazer upgrade de plano. Não bloqueamos sua operação — cobramos um valor proporcional pelos pedidos excedentes até o final do mês, com posterior migração.', open: false },
    { question: 'Como funciona o suporte técnico?', answer: 'O Starter conta com chat em horário comercial (8h-18h). O Professional inclui e-mail com SLA de 8h. O Enterprise tem gerente dedicado e SLA de 4h, incluindo suporte 24/7 para incidentes críticos.', open: false },
    { question: 'Os dados ficam no Brasil?', answer: 'Sim. Toda a infraestrutura da OptiFlow está hospedada em data centers no Brasil (AWS São Paulo - SA-EAST-1), em conformidade com a LGPD.', open: false },
    { question: 'Como funciona o cancelamento?', answer: 'Você pode cancelar a qualquer momento pelo painel, sem taxa de cancelamento. No cancelamento, você mantém acesso até o final do período pago. Nunca cobramos fidelidade mínima.', open: false },
  ];

  toggleFaq(index: number): void {
    this.faqItems[index].open = !this.faqItems[index].open;
  }
}
