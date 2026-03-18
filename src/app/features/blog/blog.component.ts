import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface BlogPost {
  slug: string;
  category: string;
  categoryVariant: 'primary' | 'success' | 'warning' | 'purple' | 'alert';
  title: string;
  excerpt: string;
  author: string;
  authorInitials: string;
  authorColor: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SectionHeaderComponent, BadgeComponent, AnimateOnScrollDirective],
  template: `
    <div class="page-enter">

      <!-- Hero -->
      <section class="blog-hero section--dark" aria-labelledby="blog-title">
        <div class="container blog-hero__inner">
          <app-badge text="Blog & Conteúdo" variant="primary" icon="article" />
          <h1 id="blog-title" class="blog-hero__title">
            Insights para <span class="gradient-text">otimizar</span><br/>sua logística.
          </h1>
          <p class="blog-hero__subtitle">Estratégias, cases e tendências para gerentes de operações e e-commerces brasileiros.</p>

          <!-- Search -->
          <div class="blog-search" role="search">
            <label for="blog-search-input" class="sr-only">Buscar artigos</label>
            <span class="material-icons-round" aria-hidden="true">search</span>
            <input
              id="blog-search-input"
              type="search"
              placeholder="Buscar artigos..."
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
              aria-label="Buscar artigos"
            />
            @if (searchQuery) {
              <button class="blog-search__clear" (click)="clearSearch()" aria-label="Limpar busca">
                <span class="material-icons-round">close</span>
              </button>
            }
          </div>
        </div>
      </section>

      <!-- Categories filter -->
      <div class="blog-categories" role="group" aria-label="Filtrar por categoria">
        <div class="container">
          <div class="blog-categories__list">
            @for (cat of categories; track cat.slug) {
              <button
                class="blog-cat-btn"
                [class.blog-cat-btn--active]="activeCategory() === cat.slug"
                (click)="setCategory(cat.slug)"
                [attr.aria-pressed]="activeCategory() === cat.slug"
              >
                <span class="material-icons-round">{{ cat.icon }}</span>
                {{ cat.label }}
                <span class="blog-cat-btn__count">{{ cat.count }}</span>
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Featured post -->
      @if (featuredPost && !searchQuery && activeCategory() === 'all') {
        <section class="blog-featured section" aria-labelledby="featured-title">
          <div class="container">
            <article class="featured-post" [appAos]="'fade-up'">
              <div class="featured-post__visual" aria-hidden="true">
                <div class="featured-post__placeholder">
                  <span class="material-icons-round">article</span>
                  <span class="featured-post__category-overlay">{{ featuredPost.category }}</span>
                </div>
              </div>
              <div class="featured-post__content">
                <app-badge [text]="featuredPost.category" [variant]="featuredPost.categoryVariant" />
                <h2 id="featured-title">{{ featuredPost.title }}</h2>
                <p class="featured-post__excerpt">{{ featuredPost.excerpt }}</p>
                <div class="featured-post__meta">
                  <div class="post-author" [style.background]="featuredPost.authorColor">{{ featuredPost.authorInitials }}</div>
                  <div class="post-meta-info">
                    <strong>{{ featuredPost.author }}</strong>
                    <span>{{ featuredPost.date }} · {{ featuredPost.readTime }} de leitura</span>
                  </div>
                </div>
                <a [routerLink]="['/blog', featuredPost.slug]" class="featured-post__cta">
                  Ler artigo completo
                  <span class="material-icons-round">arrow_forward</span>
                </a>
              </div>
            </article>
          </div>
        </section>
      }

      <!-- Posts grid -->
      <section class="blog-posts section" [class.section--no-top]="!searchQuery && activeCategory() === 'all'" aria-label="Lista de artigos">
        <div class="container">
          @if (filteredPosts().length === 0) {
            <div class="blog-empty">
              <span class="material-icons-round">search_off</span>
              <h3>Nenhum artigo encontrado</h3>
              <p>Tente outros termos ou <button (click)="clearSearch(); setCategory('all')">veja todos os artigos</button>.</p>
            </div>
          } @else {
            <div class="posts-grid">
              @for (post of filteredPosts(); track post.slug; let i = $index) {
                <article class="post-card" [appAos]="'fade-up'" [aosDelay]="(i % 3) * 60">
                  <!-- Post illustration -->
                  <div class="post-card__visual" aria-hidden="true">
                    <span class="material-icons-round">article</span>
                  </div>
                  <div class="post-card__body">
                    <app-badge [text]="post.category" [variant]="post.categoryVariant" />
                    <h3 class="post-card__title">
                      <a [routerLink]="['/blog', post.slug]">{{ post.title }}</a>
                    </h3>
                    <p class="post-card__excerpt">{{ post.excerpt }}</p>
                    <div class="post-card__tags">
                      @for (tag of post.tags; track tag) {
                        <span class="tag">{{ tag }}</span>
                      }
                    </div>
                    <div class="post-card__footer">
                      <div class="post-author-mini" [style.background]="post.authorColor">{{ post.authorInitials }}</div>
                      <div class="post-card__meta">
                        <span class="post-card__author">{{ post.author }}</span>
                        <span class="post-card__date">{{ post.date }} · {{ post.readTime }}</span>
                      </div>
                      <a [routerLink]="['/blog', post.slug]" class="post-card__read" [attr.aria-label]="'Ler ' + post.title">
                        <span class="material-icons-round">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </article>
              }
            </div>

            <!-- Load more -->
            <div class="blog-load-more" [appAos]="'fade-up'">
              <button class="btn-outline-primary">
                <span class="material-icons-round">refresh</span>
                Carregar mais artigos
              </button>
            </div>
          }
        </div>
      </section>

      <!-- Newsletter CTA -->
      <section class="blog-newsletter section section--surface" aria-labelledby="newsletter-title">
        <div class="container">
          <div class="newsletter-card" [appAos]="'zoom-in'">
            <div class="newsletter-card__content">
              <h2 id="newsletter-title">Receba novidades direto no e-mail.</h2>
              <p>Artigos, cases e tendências para quem gerencia logística de e-commerce. Sem spam.</p>
            </div>
            <form class="newsletter-form" (ngSubmit)="subscribeNewsletter()" aria-label="Formulário de newsletter">
              <label for="newsletter-email" class="sr-only">Seu e-mail</label>
              <input
                id="newsletter-email"
                type="email"
                [(ngModel)]="newsletterEmail"
                name="newsletterEmail"
                placeholder="voce@empresa.com.br"
                [attr.aria-describedby]="newsletterError ? 'newsletter-error' : null"
              />
              <button type="submit">
                @if (!newsletterSuccess()) {
                  <span><span class="material-icons-round">send</span> Inscrever-se</span>
                } @else {
                  <span><span class="material-icons-round">check</span> Inscrito!</span>
                }
              </button>
            </form>
            @if (newsletterError) {
              <span id="newsletter-error" class="newsletter-error" role="alert">{{ newsletterError }}</span>
            }
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .gradient-text { background: linear-gradient(135deg,#1A73E8,#9334E6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

    .blog-hero {
      padding: 72px 0; background: #0F172A;
      &__inner { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px; }
      &__title { font-size: clamp(2rem,4vw,3.25rem); color: #F1F5F9; font-weight: 800; letter-spacing: -.04em; }
      &__subtitle { font-size: 1.0625rem; color: #94A3B8; }
    }

    .blog-search {
      position: relative; width: 100%; max-width: 500px; display: flex; align-items: center;
      .material-icons-round { position: absolute; left: 16px; font-size: 20px; color: #94A3B8; pointer-events: none; }
      input {
        width: 100%; padding: 14px 16px 14px 48px; background: rgba(255,255,255,.06); border: 1.5px solid rgba(255,255,255,.1);
        border-radius: 14px; color: #F1F5F9; font-family: var(--font-sans,'Inter',sans-serif); font-size: .9375rem; outline: none; transition: border-color 200ms;
        &::placeholder { color: #64748B; }
        &:focus { border-color: #60A5FA; }
      }
      &__clear { position: absolute; right: 12px; background: none; border: none; color: #94A3B8; cursor: pointer; padding: 4px; display: flex; border-radius: 50%; &:hover { background: rgba(255,255,255,.1); } .material-icons-round { font-size: 18px; } }
    }

    .blog-categories {
      background: var(--color-surface); border-bottom: 1px solid var(--color-border); padding: 16px 0;
      &__list { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; &::-webkit-scrollbar { display: none; } }
    }

    .blog-cat-btn {
      display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 99px; border: 1.5px solid var(--color-border);
      background: none; color: var(--color-text-secondary); font-family: var(--font-sans,'Inter',sans-serif); font-size: .875rem; font-weight: 600;
      cursor: pointer; white-space: nowrap; transition: all 200ms;
      .material-icons-round { font-size: 16px; }
      &__count { background: var(--color-surface-2); border-radius: 99px; padding: 1px 7px; font-size: .75rem; }
      &--active { background: var(--color-primary); color: white; border-color: var(--color-primary); .blog-cat-btn__count { background: rgba(255,255,255,.2); color: white; } }
      &:hover:not(&--active) { border-color: var(--color-primary); color: var(--color-primary); }
    }

    .featured-post {
      display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
      background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 24px; overflow: hidden;
      @media(max-width:1024px){grid-template-columns:1fr;}
      &__visual { height: 340px; @media(max-width:1024px){height:200px;} }
      &__placeholder {
        width: 100%; height: 100%; background: linear-gradient(135deg,rgba(26,115,232,.12),rgba(147,52,230,.12));
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; position: relative;
        .material-icons-round { font-size: 64px; color: rgba(26,115,232,.3); }
      }
      &__category-overlay { position: absolute; top: 20px; left: 20px; background: var(--color-primary); color: white; padding: 4px 12px; border-radius: 99px; font-size: .75rem; font-weight: 700; }
      &__content { padding: 40px; display: flex; flex-direction: column; gap: 16px; @media(max-width:1024px){padding:24px;} }
      h2 { font-size: clamp(1.375rem,2.5vw,1.875rem); font-weight: 800; line-height: 1.25; }
      &__excerpt { font-size: .9375rem; color: var(--color-text-secondary); line-height: 1.75; }
      &__meta { display: flex; align-items: center; gap: 12px; }
      &__cta { display: inline-flex; align-items: center; gap: 8px; color: var(--color-primary); font-weight: 700; font-size: .9375rem; text-decoration: none; margin-top: 8px; .material-icons-round { font-size: 20px; transition: transform 200ms; } &:hover .material-icons-round { transform: translateX(4px); } }
    }

    .post-author { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: .875rem; font-weight: 700; color: white; flex-shrink: 0; }
    .post-meta-info { display: flex; flex-direction: column; strong { font-size: .9rem; } span { font-size: .8rem; color: var(--color-text-muted); } }

    .section--no-top { padding-top: 0; }
    .posts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; @media(max-width:1024px){grid-template-columns:repeat(2,1fr);} @media(max-width:640px){grid-template-columns:1fr;} }

    .post-card {
      background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px; overflow: hidden; transition: all 200ms;
      &:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
      &__visual { height: 160px; background: linear-gradient(135deg,rgba(26,115,232,.08),rgba(147,52,230,.08)); display: flex; align-items: center; justify-content: center; .material-icons-round { font-size: 48px; color: rgba(26,115,232,.3); } }
      &__body { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
      &__title { font-size: 1.0625rem; font-weight: 700; line-height: 1.4; margin: 0; a { color: var(--color-text-primary); text-decoration: none; &:hover { color: var(--color-primary); } } }
      &__excerpt { font-size: .875rem; color: var(--color-text-secondary); line-height: 1.65; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      &__tags { display: flex; gap: 6px; flex-wrap: wrap; }
      &__footer { display: flex; align-items: center; gap: 10px; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--color-border); }
      &__meta { flex: 1; display: flex; flex-direction: column; }
      &__author { font-size: .8125rem; font-weight: 600; color: var(--color-text-primary); }
      &__date { font-size: .75rem; color: var(--color-text-muted); }
      &__read { width: 32px; height: 32px; background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: 8px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: var(--color-primary); transition: all 200ms; flex-shrink: 0; .material-icons-round { font-size: 18px; } &:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); } }
    }

    .post-author-mini { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: .75rem; font-weight: 700; color: white; flex-shrink: 0; }

    .tag { padding: 2px 8px; background: var(--color-surface-2); border-radius: 99px; font-size: .75rem; color: var(--color-text-muted); font-weight: 500; }

    .blog-empty { text-align: center; padding: 64px 0; display: flex; flex-direction: column; align-items: center; gap: 16px; .material-icons-round { font-size: 48px; color: var(--color-text-muted); } h3 { font-size: 1.25rem; } p { color: var(--color-text-secondary); button { background: none; border: none; color: var(--color-primary); cursor: pointer; font-size: inherit; text-decoration: underline; } } }

    .blog-load-more { display: flex; justify-content: center; margin-top: 48px; }
    .btn-outline-primary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: none; border: 2px solid var(--color-primary); color: var(--color-primary); border-radius: 12px; font-family: var(--font-sans,'Inter',sans-serif); font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 200ms; .material-icons-round { font-size: 20px; } &:hover { background: var(--color-primary); color: white; } }

    .newsletter-card {
      background: linear-gradient(135deg, rgba(26,115,232,.06), rgba(147,52,230,.06)); border: 1px solid rgba(26,115,232,.2); border-radius: 24px;
      padding: 48px; display: flex; align-items: center; gap: 48px;
      @media(max-width:1024px){flex-direction:column; gap:24px;}
      &__content { flex: 1; h2 { font-size: clamp(1.375rem,2.5vw,1.875rem); font-weight: 800; margin-bottom: 8px; } p { color: var(--color-text-secondary); } }
    }

    .newsletter-form {
      display: flex; gap: 0; border-radius: 14px; overflow: hidden; border: 1.5px solid var(--color-border); flex-shrink: 0; width: 380px;
      @media(max-width:480px){flex-direction:column; width:100%; border-radius:14px; overflow:visible; gap:8px;}
      input {
        flex: 1; padding: 14px 16px; background: var(--color-surface); border: none; border-radius: 0; outline: none;
        font-family: var(--font-sans,'Inter',sans-serif); font-size: .9375rem; color: var(--color-text-primary); min-width: 0;
        &::placeholder { color: var(--color-text-muted); }
        @media(max-width:480px){border: 1.5px solid var(--color-border); border-radius: 12px;}
      }
      button {
        padding: 14px 20px; background: var(--color-primary); color: white; border: none; cursor: pointer;
        font-family: var(--font-sans,'Inter',sans-serif); font-size: .9375rem; font-weight: 700; white-space: nowrap; transition: background 200ms;
        display: flex; align-items: center; gap: 8px;
        .material-icons-round { font-size: 18px; }
        &:hover { background: #1557B0; }
        @media(max-width:480px){border-radius:12px;}
      }
    }

    .newsletter-error { font-size: .8125rem; color: #EF4444; margin-top: 6px; }
  `],
})
export class BlogComponent {
  searchQuery = '';
  newsletterEmail = '';
  newsletterError = '';
  newsletterSuccess = signal(false);
  activeCategory = signal('all');

  readonly categories = [
    { slug: 'all', label: 'Todos', icon: 'apps', count: 12 },
    { slug: 'roteirizacao', label: 'Roteirização', icon: 'route', count: 4 },
    { slug: 'gestao', label: 'Gestão de Frota', icon: 'local_shipping', count: 3 },
    { slug: 'ecommerce', label: 'E-commerce', icon: 'shopping_cart', count: 3 },
    { slug: 'lgpd', label: 'LGPD & Dados', icon: 'verified_user', count: 2 },
  ];

  readonly posts: BlogPost[] = [
    {
      slug: 'como-reduzir-custo-combustivel-frota',
      category: 'Roteirização', categoryVariant: 'primary',
      title: 'Como reduzir em 35% o gasto com combustível da sua frota através de rotas inteligentes',
      excerpt: 'Descubra as técnicas de roteirização VRP que grandes transportadoras usam e como aplicá-las na sua operação de e-commerce sem precisar de uma equipe de TI.',
      author: 'Júlia Ferreira', authorInitials: 'JF', authorColor: 'linear-gradient(135deg,#9334E6,#6B21A8)',
      date: '12 Jun 2024', readTime: '8 min', featured: true,
      tags: ['Combustível', 'VRP', 'Economia'],
    },
    {
      slug: 'lgpd-logistica-o-que-preciso-saber',
      category: 'LGPD & Dados', categoryVariant: 'success',
      title: 'LGPD na logística: o que as empresas de e-commerce precisam saber em 2024',
      excerpt: 'Um guia completo sobre as obrigações da Lei Geral de Proteção de Dados para operações logísticas, com foco em dados de motoristas e destinatários.',
      author: 'Rafael Mendes', authorInitials: 'RM', authorColor: 'linear-gradient(135deg,#1A73E8,#0D47A1)',
      date: '5 Jun 2024', readTime: '11 min',
      tags: ['LGPD', 'Compliance', 'Dados'],
    },
    {
      slug: 'metricas-kpi-ultima-milha',
      category: 'Gestão de Frota', categoryVariant: 'warning',
      title: '7 KPIs essenciais para acompanhar a performance da última milha',
      excerpt: 'Taxa de entrega no prazo, custo por entrega, ociosidade de frota... Saiba quais métricas monitorar e como calculá-las corretamente.',
      author: 'Marcus Oliveira', authorInitials: 'MO', authorColor: 'linear-gradient(135deg,#34A853,#166534)',
      date: '28 Mai 2024', readTime: '6 min',
      tags: ['KPI', 'Analytics', 'Performance'],
    },
    {
      slug: 'integracao-shopify-logistica',
      category: 'E-commerce', categoryVariant: 'purple',
      title: 'Como integrar o Shopify ao seu sistema de roteirização em menos de 1 dia',
      excerpt: 'Passo a passo para conectar sua loja Shopify a uma solução de gestão logística e começar a otimizar automaticamente os pedidos recebidos.',
      author: 'Carla Santos', authorInitials: 'CS', authorColor: 'linear-gradient(135deg,#FBBF24,#B45309)',
      date: '20 Mai 2024', readTime: '7 min',
      tags: ['Shopify', 'Integração', 'Automação'],
    },
    {
      slug: 'gestao-motoristas-app',
      category: 'Gestão de Frota', categoryVariant: 'warning',
      title: 'App para motoristas: como um aplicativo móvel reduziu os atrasos em 40%',
      excerpt: 'Case de uso real de como a comunicação em tempo real entre operacional e motoristas via app reduziu drasticamente os atrasos e reclamações de clientes.',
      author: 'Thiago Costa', authorInitials: 'TC', authorColor: 'linear-gradient(135deg,#EF4444,#991B1B)',
      date: '14 Mai 2024', readTime: '5 min',
      tags: ['App', 'Motoristas', 'Case'],
    },
    {
      slug: 'previsao-demanda-ia',
      category: 'Roteirização', categoryVariant: 'primary',
      title: 'Previsão de demanda com IA: planeje sua frota com 2 semanas de antecedência',
      excerpt: 'Entenda como modelos preditivos de machine learning podem antecipar picos de volume logístico e como isso se traduz em economia de até 20% no custo operacional.',
      author: 'Júlia Ferreira', authorInitials: 'JF', authorColor: 'linear-gradient(135deg,#9334E6,#6B21A8)',
      date: '8 Mai 2024', readTime: '10 min',
      tags: ['IA', 'Machine Learning', 'Previsão'],
    },
    {
      slug: 'ecommerce-devolucoes-logistica-reversa',
      category: 'E-commerce', categoryVariant: 'purple',
      title: 'Logística reversa para e-commerce: como transformar devoluções em vantagem competitiva',
      excerpt: 'A taxa de devolução do e-commerce brasileiro é de 11%. Veja como ter um processo eficiente de logística reversa pode fidelizar clientes insatisfeitos.',
      author: 'Ana Lima', authorInitials: 'AL', authorColor: 'linear-gradient(135deg,#06B6D4,#0E7490)',
      date: '2 Mai 2024', readTime: '8 min',
      tags: ['Devolução', 'Reversa', 'Fidelização'],
    },
    {
      slug: 'sazonalidade-logistica-black-friday',
      category: 'E-commerce', categoryVariant: 'purple',
      title: 'Sazonalidade logística: como se preparar para a Black Friday e datas comemorativas',
      excerpt: 'Um playbook completo para escalar sua operação de entrega durante picos sazonais sem aumentar proporcionalmente os custos operacionais.',
      author: 'Carla Santos', authorInitials: 'CS', authorColor: 'linear-gradient(135deg,#FBBF24,#B45309)',
      date: '25 Abr 2024', readTime: '9 min',
      tags: ['Black Friday', 'Sazonalidade', 'Escala'],
    },
    {
      slug: 'dados-motoristas-lgpd-boas-praticas',
      category: 'LGPD & Dados', categoryVariant: 'success',
      title: 'Boas práticas para coleta e armazenamento de dados de motoristas conforme a LGPD',
      excerpt: 'Localização em tempo real, histórico de rotas, avaliações de desempenho — saiba exatamente o que pode e o que não pode ser coletado sobre seus motoristas.',
      author: 'Rafael Mendes', authorInitials: 'RM', authorColor: 'linear-gradient(135deg,#1A73E8,#0D47A1)',
      date: '18 Abr 2024', readTime: '7 min',
      tags: ['LGPD', 'Motoristas', 'Privacidade'],
    },
    {
      slug: 'roteirizacao-multi-deposito',
      category: 'Roteirização', categoryVariant: 'primary',
      title: 'Roteirização multi-depósito: como gerenciar múltiplos centros de distribuição',
      excerpt: 'Para operações com mais de um CD, o algoritmo de roteirização precisa resolver o problema de alocação de pedidos entre depósitos e motoristas simultaneamente.',
      author: 'Júlia Ferreira', authorInitials: 'JF', authorColor: 'linear-gradient(135deg,#9334E6,#6B21A8)',
      date: '10 Abr 2024', readTime: '12 min',
      tags: ['Multi-CD', 'VRP', 'Avançado'],
    },
    {
      slug: 'rastreamento-tempo-real-clientes',
      category: 'Gestão de Frota', categoryVariant: 'warning',
      title: 'Rastreamento em tempo real: por que compartilhar a posição do pedido reduz 60% dos contatos no SAC',
      excerpt: 'O "onde está meu pedido?" é responsável por 56% dos contatos ao SAC no e-commerce. Veja como o rastreamento ao vivo elimina a ansiedade do cliente.',
      author: 'Ana Lima', authorInitials: 'AL', authorColor: 'linear-gradient(135deg,#06B6D4,#0E7490)',
      date: '3 Abr 2024', readTime: '6 min',
      tags: ['Rastreamento', 'SAC', 'CX'],
    },
    {
      slug: 'roi-sistema-roteirizacao',
      category: 'Roteirização', categoryVariant: 'primary',
      title: 'Como calcular o ROI de um sistema de roteirização inteligente para sua empresa',
      excerpt: 'Planilha e metodologia completa para calcular o retorno sobre investimento de uma plataforma de gestão logística, levando em conta combustível, horas-extras e manutenção.',
      author: 'Marcus Oliveira', authorInitials: 'MO', authorColor: 'linear-gradient(135deg,#34A853,#166534)',
      date: '28 Mar 2024', readTime: '10 min',
      tags: ['ROI', 'Análise', 'Financeiro'],
    },
  ];

  get featuredPost(): BlogPost | undefined {
    return this.posts.find(p => p.featured);
  }

  filteredPosts = signal(this.getFiltered());

  setCategory(slug: string): void {
    this.activeCategory.set(slug);
    this.filteredPosts.set(this.getFiltered());
  }

  onSearch(): void {
    this.filteredPosts.set(this.getFiltered());
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredPosts.set(this.getFiltered());
  }

  private getFiltered(): BlogPost[] {
    let result = this.posts.filter(p => !p.featured || this.activeCategory() !== 'all' || !!this.searchQuery);
    if (this.activeCategory() !== 'all') {
      const cat = this.categories.find(c => c.slug === this.activeCategory());
      if (cat) result = result.filter(p => p.category === cat.label);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }

  subscribeNewsletter(): void {
    if (!this.newsletterEmail || !this.newsletterEmail.includes('@')) {
      this.newsletterError = 'Informe um e-mail válido.';
      return;
    }
    this.newsletterError = '';
    this.newsletterSuccess.set(true);
    this.newsletterEmail = '';
  }
}
