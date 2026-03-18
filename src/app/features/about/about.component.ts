import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

interface TimelineEvent { year: string; title: string; desc: string; icon: string; }
interface TeamMember { name: string; role: string; bio: string; initials: string; color: string; linkedin: string; }
interface Value { icon: string; title: string; desc: string; color: string; }

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent, BadgeComponent, AnimateOnScrollDirective],
  template: `
    <div class="page-enter">

      <!-- Hero -->
      <section class="about-hero section--dark" aria-labelledby="about-title">
        <div class="container about-hero__inner">
          <div class="about-hero__content" [appAos]="'fade-right'">
            <app-badge text="Nossa história" variant="primary" icon="auto_stories" />
            <h1 id="about-title" class="about-hero__title">
              Nascemos para<br/><span class="gradient-text">descomplicar</span><br/>a última milha.
            </h1>
            <p class="about-hero__subtitle">
              A OptiFlow surgiu da frustração de fundadores que viveram na prática o caos logístico das PMEs brasileiras.
              Decidimos que tecnologia de ponta não pode ser privilégio de quem tem capital de venture.
            </p>
            <div class="about-hero__ctas">
              <a routerLink="/contato" class="btn-primary">
                <span class="material-icons-round">calendar_month</span>
                Agendar conversa
              </a>
              <a routerLink="/funcionalidades" class="btn-ghost">
                Ver plataforma →
              </a>
            </div>
          </div>
          <div class="about-hero__visual" [appAos]="'fade-left'" [aosDelay]="200">
            <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="480" height="360" rx="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
              <!-- Map background grid -->
              @for (row of [0,1,2,3,4,5,6,7]; track row) {
                @for (col of [0,1,2,3,4,5,6,7,8,9]; track col) {
                  <rect [attr.x]="col*48" [attr.y]="row*45" width="48" height="45" fill="none" stroke="rgba(255,255,255,0.03)"/>
                }
              }
              <!-- Road lines -->
              <path d="M 0 180 Q 120 160 240 180 Q 360 200 480 180" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/>
              <path d="M 240 0 Q 260 90 240 180 Q 220 270 240 360" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/>
              <!-- Delivery nodes -->
              <circle cx="80" cy="90" r="18" fill="rgba(26,115,232,0.3)" stroke="#1A73E8" stroke-width="2"/>
              <text x="80" y="95" text-anchor="middle" fill="#60A5FA" font-size="14">🏪</text>
              <circle cx="380" cy="260" r="18" fill="rgba(52,168,83,0.3)" stroke="#34A853" stroke-width="2"/>
              <text x="380" y="265" text-anchor="middle" fill="#4ADE80" font-size="14">🏠</text>
              <circle cx="240" cy="180" r="22" fill="rgba(147,52,230,0.3)" stroke="#9334E6" stroke-width="2"/>
              <text x="240" y="185" text-anchor="middle" fill="#C084FC" font-size="16">🚚</text>
              <circle cx="160" cy="260" r="15" fill="rgba(251,191,36,0.3)" stroke="#FBBF24" stroke-width="2"/>
              <text x="160" y="265" text-anchor="middle" fill="#FDE68A" font-size="12">📦</text>
              <circle cx="350" cy="100" r="15" fill="rgba(26,115,232,0.3)" stroke="#1A73E8" stroke-width="2"/>
              <text x="350" y="105" text-anchor="middle" fill="#60A5FA" font-size="12">📦</text>
              <!-- Route paths -->
              <path d="M 80 90 Q 160 135 240 180" stroke="#1A73E8" stroke-width="2.5" stroke-dasharray="6 4" fill="none"/>
              <path d="M 350 100 Q 295 140 240 180" stroke="#9334E6" stroke-width="2.5" stroke-dasharray="6 4" fill="none"/>
              <path d="M 240 180 Q 200 220 160 260" stroke="#FBBF24" stroke-width="2.5" stroke-dasharray="6 4" fill="none"/>
              <path d="M 240 180 Q 310 220 380 260" stroke="#34A853" stroke-width="2.5" stroke-dasharray="6 4" fill="none"/>
              <!-- Stats overlay -->
              <rect x="12" y="12" width="130" height="56" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)"/>
              <text x="28" y="34" fill="#94A3B8" font-size="10" font-family="Inter,sans-serif">Economia de combustível</text>
              <text x="28" y="56" fill="#34A853" font-size="20" font-weight="bold" font-family="Inter,sans-serif">-35%</text>
              <rect x="338" y="12" width="130" height="56" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)"/>
              <text x="354" y="34" fill="#94A3B8" font-size="10" font-family="Inter,sans-serif">Tempo de rota</text>
              <text x="354" y="56" fill="#1A73E8" font-size="20" font-weight="bold" font-family="Inter,sans-serif">-40%</text>
              <!-- Founding year badge -->
              <rect x="180" y="296" width="120" height="40" rx="10" fill="rgba(147,52,230,0.2)" stroke="#9334E6"/>
              <text x="240" y="321" text-anchor="middle" fill="#C084FC" font-size="13" font-weight="600" font-family="Inter,sans-serif">Fundada em 2021</text>
            </svg>
          </div>
        </div>
      </section>

      <!-- Numbers -->
      <section class="about-numbers section section--surface" aria-label="Números da OptiFlow">
        <div class="container">
          <div class="numbers-grid">
            @for (stat of companyStats; track stat.label; let i = $index) {
              <div class="number-item" [appAos]="'fade-up'" [aosDelay]="i * 80">
                <div class="number-item__value">{{ stat.value }}</div>
                <div class="number-item__label">{{ stat.label }}</div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Mission, Vision, Values -->
      <section class="about-mvv section" aria-labelledby="mvv-title">
        <div class="container">
          <app-section-header
            eyebrow="Nossa essência"
            title="Missão, Visão"
            titleHighlight="e Valores."
            align="center"
            [appAos]="'fade-up'"
          />
          <div class="mvv-grid">
            <div class="mvv-card mvv-card--mission" [appAos]="'fade-up'" [aosDelay]="0">
              <div class="mvv-card__icon"><span class="material-icons-round">flag</span></div>
              <h3>Missão</h3>
              <p>Empoderar PMEs brasileiras com tecnologia de roteirização e analytics que antes só estavam disponíveis para grandes corporações, tornando a logística da última milha acessível, eficiente e sustentável.</p>
            </div>
            <div class="mvv-card mvv-card--vision" [appAos]="'fade-up'" [aosDelay]="100">
              <div class="mvv-card__icon"><span class="material-icons-round">visibility</span></div>
              <h3>Visão</h3>
              <p>Ser a plataforma de referência em gestão logística inteligente para o e-commerce latinoamericano, conectando 10.000 empresas e otimizando 50 milhões de entregas até 2028.</p>
            </div>
            <div class="mvv-card mvv-card--values" [appAos]="'fade-up'" [aosDelay]="200">
              <div class="mvv-card__icon"><span class="material-icons-round">diamond</span></div>
              <h3>Valores</h3>
              <ul>
                <li><span class="material-icons-round">check_circle</span> Transparência radical</li>
                <li><span class="material-icons-round">check_circle</span> Foco obsessivo no cliente</li>
                <li><span class="material-icons-round">check_circle</span> Inovação pragmática</li>
                <li><span class="material-icons-round">check_circle</span> Privacidade como padrão</li>
                <li><span class="material-icons-round">check_circle</span> Responsabilidade ambiental</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Values detail -->
      <section class="about-values section section--surface" aria-labelledby="values-title">
        <div class="container">
          <app-section-header
            eyebrow="Como trabalhamos"
            title="Princípios que guiam"
            titleHighlight="cada decisão."
            [appAos]="'fade-up'"
          />
          <div class="values-grid">
            @for (value of values; track value.title; let i = $index) {
              <div class="value-card" [appAos]="'fade-up'" [aosDelay]="i * 60">
                <div class="value-card__icon" [style.background]="value.color + '22'" [style.color]="value.color">
                  <span class="material-icons-round">{{ value.icon }}</span>
                </div>
                <h4>{{ value.title }}</h4>
                <p>{{ value.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Timeline -->
      <section class="about-timeline section" aria-labelledby="timeline-title">
        <div class="container">
          <app-section-header
            eyebrow="Nossa trajetória"
            title="De ideia a"
            titleHighlight="impacto real."
            [appAos]="'fade-up'"
          />
          <div class="timeline">
            @for (event of timeline; track event.year; let i = $index) {
              <div class="timeline-item" [class.timeline-item--right]="i % 2 !== 0" [appAos]="i % 2 === 0 ? 'fade-right' : 'fade-left'" [aosDelay]="i * 80">
                <div class="timeline-item__content">
                  <div class="timeline-item__icon">
                    <span class="material-icons-round">{{ event.icon }}</span>
                  </div>
                  <div class="timeline-item__year">{{ event.year }}</div>
                  <h4>{{ event.title }}</h4>
                  <p>{{ event.desc }}</p>
                </div>
                <div class="timeline-item__dot"></div>
              </div>
            }
            <div class="timeline__line" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="about-team section section--surface" aria-labelledby="team-title">
        <div class="container">
          <app-section-header
            eyebrow="Quem faz acontecer"
            title="O time por"
            titleHighlight="trás da OptiFlow."
            [appAos]="'fade-up'"
          />
          <div class="team-grid">
            @for (member of team; track member.name; let i = $index) {
              <article class="team-card" [appAos]="'fade-up'" [aosDelay]="i * 80">
                <div class="team-card__avatar" [style.background]="member.color">{{ member.initials }}</div>
                <div class="team-card__info">
                  <h4>{{ member.name }}</h4>
                  <p class="role">{{ member.role }}</p>
                  <p class="bio">{{ member.bio }}</p>
                </div>
                <a [href]="member.linkedin" target="_blank" rel="noopener noreferrer" class="team-card__linkedin" [attr.aria-label]="'LinkedIn de ' + member.name">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- Tech stack -->
      <section class="about-tech section" aria-labelledby="tech-title">
        <div class="container">
          <app-section-header
            eyebrow="Infraestrutura & tecnologia"
            title="Construído para"
            titleHighlight="escalar com segurança."
            [appAos]="'fade-up'"
          />
          <div class="tech-grid">
            @for (tech of techStack; track tech.name; let i = $index) {
              <div class="tech-chip" [appAos]="'fade-up'" [aosDelay]="i * 40">
                <span class="material-icons-round" [style.color]="tech.color">{{ tech.icon }}</span>
                {{ tech.name }}
              </div>
            }
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="about-cta section section--dark" aria-labelledby="about-cta-title">
        <div class="container about-cta__inner" [appAos]="'zoom-in'">
          <h2 id="about-cta-title">Quer fazer parte dessa história?</h2>
          <p>Estamos sempre em busca de talentos e de empresas que queiram transformar sua logística.</p>
          <div class="about-cta__btns">
            <a routerLink="/contato" class="btn-primary">
              <span class="material-icons-round">rocket_launch</span>
              Começar gratuitamente
            </a>
            <a href="mailto:carreira@optiflow.com.br" class="btn-outline">
              <span class="material-icons-round">work</span>
              Ver vagas abertas
            </a>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .gradient-text { background: linear-gradient(135deg,#1A73E8,#9334E6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    .about-hero {
      padding: 80px 0; background: #0F172A;
      &__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
        @media(max-width:1024px){grid-template-columns:1fr;} }
      &__title { font-size: clamp(2.25rem,4vw,3.5rem); color:#F1F5F9; font-weight:800; letter-spacing:-.04em; line-height:1.1; margin: 16px 0; }
      &__subtitle { font-size: 1.0625rem; color:#94A3B8; line-height:1.75; margin-bottom:32px; }
      &__ctas { display:flex; gap:16px; flex-wrap:wrap; }
      &__visual svg { width:100%; border-radius:20px; }
    }

    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px;
      background: var(--color-primary); color: white; border-radius: 12px;
      font-weight: 700; font-size: 1rem; text-decoration: none; transition: all 200ms;
      box-shadow: 0 6px 20px rgba(26,115,232,.4);
      .material-icons-round { font-size: 20px; }
      &:hover { background: #1557B0; transform: translateY(-2px); }
    }

    .btn-ghost { display: inline-flex; align-items: center; color: #94A3B8; font-weight: 600; font-size: 1rem; text-decoration: none; padding: 14px 0; transition: color 200ms; &:hover { color: white; } }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px;
      border: 2px solid rgba(255,255,255,.2); color: white; border-radius: 12px;
      font-weight: 700; font-size: 1rem; text-decoration: none; transition: all 200ms;
      .material-icons-round { font-size: 20px; }
      &:hover { border-color: white; }
    }

    .numbers-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; @media(max-width:768px){grid-template-columns:repeat(2,1fr);} }
    .number-item {
      text-align: center; padding: 32px 16px;
      &__value { font-size: clamp(2.25rem,4vw,3rem); font-weight: 800; background: linear-gradient(135deg,#1A73E8,#9334E6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      &__label { font-size: .9375rem; color: var(--color-text-secondary); margin-top: 8px; }
    }

    .mvv-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; @media(max-width:1024px){grid-template-columns:1fr;} }
    .mvv-card {
      padding: 32px; border-radius: 20px; border: 1px solid var(--color-border); background: var(--color-surface);
      &__icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; .material-icons-round { font-size: 28px; } }
      h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; }
      p { color: var(--color-text-secondary); line-height: 1.7; }
      ul { list-style: none; display: flex; flex-direction: column; gap: 10px; li { display: flex; align-items: center; gap: 8px; font-size: .9375rem; color: var(--color-text-secondary); .material-icons-round { font-size: 18px; color: #34A853; } } }
      &--mission &__icon { background: rgba(26,115,232,.1); color: #1A73E8; }
      &--vision &__icon { background: rgba(147,52,230,.1); color: #9334E6; }
      &--values &__icon { background: rgba(52,168,83,.1); color: #34A853; }
    }

    .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; @media(max-width:1024px){grid-template-columns:repeat(2,1fr);} @media(max-width:640px){grid-template-columns:1fr;} }
    .value-card {
      padding: 28px; border-radius: 16px; border: 1px solid var(--color-border); background: var(--color-surface); transition: box-shadow 200ms;
      &:hover { box-shadow: var(--shadow-md); }
      &__icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; .material-icons-round { font-size: 24px; } }
      h4 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
      p { font-size: .9rem; color: var(--color-text-secondary); line-height: 1.65; }
    }

    .timeline {
      position: relative; max-width: 840px; margin: 48px auto 0;
      &__line { position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, #1A73E8, #9334E6); transform: translateX(-50%); @media(max-width:768px){left:24px;} }
    }
    .timeline-item {
      display: flex; justify-content: flex-start; position: relative; margin-bottom: 48px;
      &__dot { width: 16px; height: 16px; border-radius: 50%; background: white; border: 3px solid #1A73E8; position: absolute; left: 50%; top: 24px; transform: translateX(-50%); z-index: 2; @media(max-width:768px){left:24px;} }
      &__content { width: calc(50% - 32px); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 24px; @media(max-width:768px){width:calc(100% - 60px);margin-left:60px;} }
      &__icon { width: 40px; height: 40px; background: linear-gradient(135deg,#1A73E8,#9334E6); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; .material-icons-round { color: white; font-size: 20px; } }
      &__year { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--color-primary); margin-bottom: 6px; }
      h4 { font-weight: 700; margin-bottom: 8px; }
      p { font-size: .9rem; color: var(--color-text-secondary); line-height: 1.65; }
      &--right { justify-content: flex-end; @media(max-width:768px){justify-content:flex-start;} }
    }

    .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; @media(max-width:1024px){grid-template-columns:repeat(2,1fr);} @media(max-width:640px){grid-template-columns:1fr;} }
    .team-card {
      padding: 28px; border-radius: 20px; border: 1px solid var(--color-border); background: var(--color-surface); display: flex; flex-direction: column; gap: 16px;
      &__avatar { width: 72px; height: 72px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: white; letter-spacing: .02em; }
      &__info { h4 { font-weight: 700; font-size: 1.0625rem; margin-bottom: 4px; } .role { font-size: .875rem; color: var(--color-primary); font-weight: 600; margin-bottom: 10px; } .bio { font-size: .875rem; color: var(--color-text-secondary); line-height: 1.65; } }
      &__linkedin { display: inline-flex; align-items: center; gap: 6px; font-size: .8125rem; font-weight: 600; color: #0A66C2; text-decoration: none; margin-top: auto; &:hover { text-decoration: underline; } }
    }

    .tech-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 48px; justify-content: center; }
    .tech-chip { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 999px; font-size: .9rem; font-weight: 500; color: var(--color-text-secondary); .material-icons-round { font-size: 18px; } }

    .about-cta { &__inner { max-width: 640px; margin: 0 auto; text-align: center; h2 { font-size: clamp(1.75rem,3vw,2.5rem); color:#F1F5F9; margin-bottom:16px; } p { color:#94A3B8; margin-bottom:32px; } } &__btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; } }
  `],
})
export class AboutComponent {
  readonly companyStats = [
    { value: '1.200+', label: 'Empresas ativas' },
    { value: 'R$ 48M+', label: 'Economizados p/ clientes' },
    { value: '4M+', label: 'Entregas otimizadas' },
    { value: '98,7%', label: 'Satisfação (NPS)' },
  ];

  readonly timeline: TimelineEvent[] = [
    { year: '2021 · Jan', title: 'A ideia nasce', desc: 'Os fundadores, depois de 8 anos gerenciando operações logísticas em e-commerces, identificam que 97% das PMEs não têm acesso a ferramentas de roteirização eficazes.', icon: 'lightbulb' },
    { year: '2021 · Jun', title: 'Primeiros clientes beta', desc: 'MVP lançado para 12 e-commerces do interior de São Paulo. Resultado: 28% de redução de combustível na primeira semana.', icon: 'science' },
    { year: '2022 · Mar', title: 'Rodada pré-seed', desc: 'Captação de R$1,5M com fundo especializado em logtech. Time cresce para 8 pessoas e início do desenvolvimento do módulo de analytics.', icon: 'trending_up' },
    { year: '2022 · Nov', title: '100 clientes & primeiro prêmio', desc: 'Chegamos a 100 empresas ativas e recebemos o prêmio "Inovação em Logística" da ABRALOG — Associação Brasileira de Logística.', icon: 'emoji_events' },
    { year: '2023 · Mai', title: 'Módulo de motoristas e rastreamento', desc: 'Lançamento do app para motoristas (iOS e Android), chat em tempo real com o operacional e rastreamento GPS multicamada.', icon: 'smartphone' },
    { year: '2024 · Fev', title: 'Expansão e LGPD', desc: 'Superamos 1.200 clientes ativos. Conquista da certificação de conformidade LGPD e início das conversas para expansão ao México e Colômbia.', icon: 'verified_user' },
  ];

  readonly team: TeamMember[] = [
    { name: 'Rafael Mendes', role: 'CEO & Co-fundador', bio: 'Ex-gerente de operações logísticas da Netshoes e Magazine Luiza. 10 anos de experiência em última milha e e-commerce.', initials: 'RM', color: 'linear-gradient(135deg,#1A73E8,#0D47A1)', linkedin: 'https://www.linkedin.com/in/daniel-tomazi/' },
    { name: 'Júlia Ferreira', role: 'CTO & Co-fundadora', bio: 'PhD em otimização por grafos pela Unicamp. Especialista em algoritmos VRP e machine learning aplicado à logística.', initials: 'JF', color: 'linear-gradient(135deg,#9334E6,#6B21A8)', linkedin: 'https://www.linkedin.com/in/daniel-tomazi/' },
    { name: 'Marcus Oliveira', role: 'Head de Product', bio: 'Formado em Design pela ESPM, certificado em Product Management pelo Product School. Ex-Rappi e iFood.', initials: 'MO', color: 'linear-gradient(135deg,#34A853,#166534)', linkedin: 'https://www.linkedin.com/in/daniel-tomazi/' },
    { name: 'Carla Santos', role: 'Head de Customer Success', bio: 'MBA em Gestão de Negócios pela FGV. 8 anos de experiência em CS em SaaS B2B. Autora do framework "Logística Centrada no Cliente".', initials: 'CS', color: 'linear-gradient(135deg,#FBBF24,#B45309)', linkedin: 'https://www.linkedin.com/in/daniel-tomazi/' },
    { name: 'Thiago Costa', role: 'Lead Engineer', bio: 'Engenheiro de software sênior com foco em sistemas distribuídos. Contribuidor ativo de projetos open-source de roteamento.', initials: 'TC', color: 'linear-gradient(135deg,#EF4444,#991B1B)', linkedin: 'https://www.linkedin.com/in/daniel-tomazi/' },
    { name: 'Ana Lima', role: 'Head de Marketing', bio: 'Growth hacker especializada em B2B SaaS. Histórico de reduzir CAC em 40% e aumentar MRR em 3x nas últimas duas startups.', initials: 'AL', color: 'linear-gradient(135deg,#06B6D4,#0E7490)', linkedin: 'https://www.linkedin.com/in/daniel-tomazi/' },
  ];

  readonly values: Value[] = [
    { icon: 'gpp_good', title: 'Confiança como fundamento', desc: 'Nossos clientes confiam seus dados e suas operações a nós. Levamos essa responsabilidade com seriedade absoluta.', color: '#1A73E8' },
    { icon: 'speed', title: 'Velocidade sem descuido', desc: 'Entregamos rápido mas não entregamos mal. Cada feature passa por rigoroso processo de QA antes de ir ao ar.', color: '#9334E6' },
    { icon: 'nature_people', title: 'Impacto positivo', desc: 'Rotas otimizadas significam menos combustível queimado, menos emissões e cidades mais sustentáveis.', color: '#34A853' },
    { icon: 'school', title: 'Aprendizado contínuo', desc: 'Logística é um setor que evolui rapidamente. Nossa equipe dedica 20% do tempo a aprendizado e pesquisa.', color: '#FBBF24' },
    { icon: 'handshake', title: 'Parceria de verdade', desc: 'Não somos apenas um software. Somos parceiros de negócio que se importam com o crescimento do seu e-commerce.', color: '#EF4444' },
    { icon: 'balance', title: 'Ética em primeiro lugar', desc: 'Nunca vendemos dados, nunca usamos dark patterns, nunca escondemos taxas. Clareza total em tudo que fazemos.', color: '#06B6D4' },
  ];

  readonly techStack = [
    { name: 'Kubernetes', icon: 'settings_applications', color: '#326CE5' },
    { name: 'AWS São Paulo', icon: 'cloud', color: '#FF9900' },
    { name: 'PostgreSQL', icon: 'storage', color: '#336791' },
    { name: 'Redis', icon: 'memory', color: '#DC382D' },
    { name: 'Apache Kafka', icon: 'sync_alt', color: '#231F20' },
    { name: 'Python / FastAPI', icon: 'code', color: '#3776AB' },
    { name: 'Angular 17', icon: 'web', color: '#DD0031' },
    { name: 'GraphQL', icon: 'hub', color: '#E10098' },
    { name: 'TensorFlow', icon: 'psychology', color: '#FF6F00' },
    { name: 'OpenStreetMap', icon: 'map', color: '#7EBC6F' },
    { name: 'Terraform', icon: 'dns', color: '#7B42BC' },
    { name: 'Datadog', icon: 'monitoring', color: '#632CA6' },
  ];
}
