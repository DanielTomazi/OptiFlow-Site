import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { StatCounterComponent } from '../../shared/components/stat-counter/stat-counter.component';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { TestimonialCardComponent } from '../../shared/components/testimonial-card/testimonial-card.component';
import { PricingCardComponent, PricingFeature } from '../../shared/components/pricing-card/pricing-card.component';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { FormsModule } from '@angular/forms';
import { trigger, query, stagger, animate, style, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    BadgeComponent,
    ButtonComponent,
    SectionHeaderComponent,
    StatCounterComponent,
    FeatureCardComponent,
    TestimonialCardComponent,
    PricingCardComponent,
    DividerComponent,
    AnimateOnScrollDirective,
  ],
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query('.hero__animate', [
          style({ opacity: 0, transform: 'translateY(24px)' }),
          stagger(120, [
            animate('600ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  ctaEmail = '';
  emailSubmitted = false;

  readonly stats = [
    { target: 35, suffix: '%', label: 'Menos combustível', description: 'Com rotas otimizadas por IA' },
    { target: 40, suffix: 'min', label: 'Economizados/rota', description: 'Vs. gestão manual tradicional' },
    { target: 23, suffix: '%', label: 'Redução de atrasos', description: 'Pedidos entregues no prazo' },
    { target: 5, suffix: 'x', label: 'Mais rápido', description: 'Do que processos manuais' },
  ];

  readonly features = [
    {
      title: 'Roteirizador Inteligente',
      description: 'Algoritmos VRP (Vehicle Routing Problem) adaptados ao Brasil. Otimização automática considerando janelas de tempo, trânsito em tempo real e restrições operacionais.',
      icon: 'route',
      iconColor: '#1A73E8',
      iconBg: 'rgba(26,115,232,.1)',
      bullets: ['Integração com Google Maps e Waze', 'Janelas de entrega configuráveis', 'Otimização por custo ou tempo'],
    },
    {
      title: 'Gestão de Motoristas',
      description: 'Alocação inteligente por região de atuação, disponibilidade e jornada de trabalho. Conformidade CLT nativa com controle de horas extras.',
      icon: 'directions_car',
      iconColor: '#34A853',
      iconBg: 'rgba(52,168,83,.1)',
      bullets: ['Painel de produtividade individual', 'Controle de jornada CLT', 'Alocação por score de eficiência'],
    },
    {
      title: 'Analytics & KPIs',
      description: 'Dashboard em tempo real com os indicadores mais importantes para sua operação. Do custo por entrega ao faturamento por região — tudo visível.',
      icon: 'bar_chart',
      iconColor: '#9334E6',
      iconBg: 'rgba(147,52,230,.1)',
      bullets: ['Dashboard em tempo real', 'Análise preditiva de demanda', 'Relatórios exportáveis (PDF/Excel)'],
    },
    {
      title: 'Segurança & LGPD',
      description: 'Arquitetura Privacy by Design. JWT com 2FA, RBAC granular, criptografia de dados pessoais e DPA incluso em todos os planos.',
      icon: 'security',
      iconColor: '#EA4335',
      iconBg: 'rgba(234,67,53,.1)',
      bullets: ['JWT + autenticação 2FA', 'RBAC (controle de acesso por papel)', 'Criptografia AES-256 de dados pessoais'],
    },
  ];

  readonly steps = [
    {
      number: '01',
      title: 'Conecte sua loja',
      description: 'Integre com Shopify, VTEX, WooCommerce, Mercado Livre ou via API REST. Setup em menos de 1 dia útil.',
      icon: 'link',
    },
    {
      number: '02',
      title: 'Otimize suas rotas',
      description: 'Nosso algoritmo processa todos os pedidos, considera restrições operacionais e gera as rotas ótimas automaticamente.',
      icon: 'route',
    },
    {
      number: '03',
      title: 'Acompanhe em tempo real',
      description: 'Dashboard com KPIs atualizado a cada entrega. Notificações proativas para desvios e alertas de atraso.',
      icon: 'dashboard',
    },
  ];

  readonly integrations = [
    { name: 'Shopify', color: '#96BF48' },
    { name: 'WooCommerce', color: '#7F54B3' },
    { name: 'Mercado Livre', color: '#FFE600' },
    { name: 'VTEX', color: '#F71963' },
    { name: 'Magento', color: '#EE672F' },
    { name: 'Bling', color: '#0079BF' },
  ];

  readonly testimonials = [
    {
      quote: 'Com a OptiFlow reduzimos o custo de combustível em 31% no primeiro mês. A implementação foi surpreendentemente rápida — em 2 dias já estava operacional.',
      authorName: 'Carlos Mendes',
      role: 'Diretor de Operações',
      company: 'Marka Distribuidora',
      avatarBg: '#1A73E8',
    },
    {
      quote: 'A integração com o Mercado Livre funcionou perfeitamente. O painel de KPIs nos deu visibilidade que nunca tivemos antes. Recomendo para qualquer PME.',
      authorName: 'Ana Paula Souza',
      role: 'CEO',
      company: 'ClickFast Entregas',
      avatarBg: '#34A853',
    },
    {
      quote: 'Tínhamos 22% de pedidos atrasados. Com 3 meses de OptiFlow chegamos a menos de 4%. O algoritmo de rotas é realmente diferente do que usávamos antes.',
      authorName: 'Rafael Torres',
      role: 'Gerente de Logística',
      company: 'NovaBela Fashion',
      avatarBg: '#9334E6',
    },
  ];

  readonly starterFeatures: PricingFeature[] = [
    { label: 'Até 5 motoristas', included: true },
    { label: '500 pedidos/mês', included: true },
    { label: 'Rotas otimizadas', included: true },
    { label: 'Analytics básico', included: true },
    { label: '2 integrações', included: true },
    { label: 'Analytics avançado', included: false },
    { label: 'Suporte por chat', included: true },
    { label: 'SLA garantido', included: false },
  ];

  readonly professionalFeatures: PricingFeature[] = [
    { label: 'Até 20 motoristas', included: true, highlight: true },
    { label: '5.000 pedidos/mês', included: true, highlight: true },
    { label: 'Rotas otimizadas', included: true },
    { label: 'Analytics básico', included: true },
    { label: 'Todas as integrações', included: true, highlight: true },
    { label: 'Analytics avançado', included: true, highlight: true },
    { label: 'Chat + e-mail', included: true },
    { label: 'SLA 99,5%', included: true },
  ];

  readonly enterpriseFeatures: PricingFeature[] = [
    { label: 'Motoristas ilimitados', included: true, highlight: true },
    { label: 'Pedidos ilimitados', included: true, highlight: true },
    { label: 'Rotas otimizadas', included: true },
    { label: 'Analytics avançado', included: true },
    { label: 'Integrações custom', included: true, highlight: true },
    { label: 'Análise preditiva IA', included: true, highlight: true },
    { label: 'Gerente dedicado', included: true, highlight: true },
    { label: 'SLA 99,9%', included: true, highlight: true },
  ];

  readonly mockBars = [
    { day: 'Seg', pct: 65 },
    { day: 'Ter', pct: 80 },
    { day: 'Qua', pct: 55 },
    { day: 'Qui', pct: 90 },
    { day: 'Sex', pct: 75 },
    { day: 'Sáb', pct: 45 },
    { day: 'Dom', pct: 30 },
  ];

  readonly dashboardKpis = [
    { icon: 'local_shipping', value: '247', label: 'Entregas hoje' },
    { icon: 'attach_money', value: 'R$ 8,40', label: 'Custo/entrega' },
    { icon: 'schedule', value: '38 min', label: 'Tempo médio' },
    { icon: 'check_circle', value: '96,8%', label: 'No prazo' },
  ];

  readonly dashboardDrivers = [
    { name: 'Carlos Silva', initials: 'CS', deliveries: 18, total: 20, efficiency: 94, color: '#1A73E8', status: 'active', statusLabel: 'Ativo' },
    { name: 'Ana Rodrigues', initials: 'AR', deliveries: 15, total: 18, efficiency: 88, color: '#34A853', status: 'active', statusLabel: 'Ativo' },
    { name: 'Marco Souza', initials: 'MS', deliveries: 12, total: 15, efficiency: 76, color: '#FBBC05', status: 'break', statusLabel: 'Pausa' },
    { name: 'Julia Ferreira', initials: 'JF', deliveries: 20, total: 20, efficiency: 100, color: '#9334E6', status: 'done', statusLabel: 'Concluído' },
  ];

  submitCtaEmail(): void {
    if (this.ctaEmail && this.ctaEmail.includes('@')) {
      console.log('[CTA] Email submitted (mock):', this.ctaEmail.split('@')[1]);
      this.emailSubmitted = true;
      this.ctaEmail = '';
    }
  }
}
