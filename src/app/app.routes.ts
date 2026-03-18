import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MinimalLayoutComponent } from './layouts/minimal-layout/minimal-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
        title: 'OptiFlow — Logística Inteligente para PMEs de E-commerce',
        data: { description: 'Otimização de rotas, gestão de motoristas e analytics em tempo real. A plataforma SaaS de logística para PMEs de e-commerce.' },
      },
      {
        path: 'funcionalidades',
        loadComponent: () =>
          import('./features/features-page/features-page.component').then((m) => m.FeaturesPageComponent),
        title: 'Funcionalidades — OptiFlow',
        data: { description: 'Conheça todos os módulos da OptiFlow: Roteirizador Inteligente, Gestão de Motoristas, Analytics & KPIs e Segurança LGPD.' },
      },
      {
        path: 'planos',
        loadComponent: () =>
          import('./features/pricing/pricing.component').then((m) => m.PricingComponent),
        title: 'Planos e Preços — OptiFlow',
        data: { description: 'Planos a partir de R$ 197/mês. Starter, Professional e Enterprise para sua operação logística.' },
      },
      {
        path: 'sobre',
        loadComponent: () =>
          import('./features/about/about.component').then((m) => m.AboutComponent),
        title: 'Sobre a OptiFlow — Nossa História e Missão',
        data: { description: 'Conheça a história, missão, valores e equipe da OptiFlow Logística Inteligente.' },
      },
      {
        path: 'contato',
        loadComponent: () =>
          import('./features/contact/contact.component').then((m) => m.ContactComponent),
        title: 'Contato e Demo — OptiFlow',
        data: { description: 'Agende uma demonstração gratuita da OptiFlow. Fale com nossa equipe de especialistas em logística.' },
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./features/blog/blog.component').then((m) => m.BlogComponent),
        title: 'Blog — OptiFlow',
        data: { description: 'Artigos, cases e insights sobre logística de última milha, otimização de rotas e e-commerce.' },
      },
    ],
  },
  {
    path: '',
    component: MinimalLayoutComponent,
    children: [
      {
        path: 'privacidade',
        loadComponent: () =>
          import('./features/legal/privacy/privacy.component').then((m) => m.PrivacyComponent),
        title: 'Política de Privacidade — OptiFlow',
      },
      {
        path: 'termos',
        loadComponent: () =>
          import('./features/legal/terms/terms.component').then((m) => m.TermsComponent),
        title: 'Termos de Uso — OptiFlow',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
