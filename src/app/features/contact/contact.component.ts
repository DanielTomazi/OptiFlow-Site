import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { ContactService, ContactFormData } from '../../core/services/contact.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, SectionHeaderComponent, BadgeComponent, AnimateOnScrollDirective],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(20px)' }), animate('350ms ease', style({ opacity: 1, transform: 'translateY(0)' }))]),
      transition(':leave', [animate('200ms ease', style({ opacity: 0, transform: 'translateY(-20px)' }))]),
    ]),
  ],
  template: `
    <div class="page-enter">

      <!-- Hero -->
      <section class="contact-hero section--dark" aria-labelledby="contact-title">
        <div class="container contact-hero__inner">
          <app-badge text="Fale com nossa equipe" variant="primary" icon="chat" />
          <h1 id="contact-title" class="contact-hero__title">
            Transforme sua logística<br/><span class="gradient-text">hoje mesmo.</span>
          </h1>
          <p class="contact-hero__subtitle">Resposta em até 2 horas em horário comercial. Sem pressão de venda.</p>
        </div>
      </section>

      <!-- Main content -->
      <section class="contact-content section">
        <div class="container contact-content__grid">

          <!-- Form -->
          <div class="contact-form-wrap" [appAos]="'fade-right'">
            @if (!submitted()) {
              <div class="contact-form-card" [@fadeSlide]>
                <h2>Agende uma demonstração</h2>
                <p class="contact-form-card__sub">Nossos especialistas vão entender seu negócio e demonstrar como a OptiFlow pode ajudar. Grátis, sem compromisso.</p>

                <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                  <!-- Name -->
                  <div class="field-group">
                    <label for="name" class="field-label">Nome completo <span class="required" aria-hidden="true">*</span></label>
                    <div class="input-wrap" [class.input-wrap--error]="hasError('name')" [class.input-wrap--valid]="isValid('name')">
                      <span class="material-icons-round input-icon">person</span>
                      <input
                        id="name"
                        type="text"
                        formControlName="name"
                        placeholder="Seu nome"
                        autocomplete="name"
                        [attr.aria-describedby]="hasError('name') ? 'name-error' : null"
                        [attr.aria-invalid]="hasError('name')"
                      />
                      @if (isValid('name')) { <span class="material-icons-round input-valid-icon" aria-hidden="true">check_circle</span> }
                    </div>
                    @if (hasError('name')) {
                      <span id="name-error" class="field-error" role="alert">
                        <span class="material-icons-round">error</span>
                        {{ getError('name') }}
                      </span>
                    }
                  </div>

                  <!-- Email -->
                  <div class="field-group">
                    <label for="email" class="field-label">E-mail corporativo <span class="required" aria-hidden="true">*</span></label>
                    <div class="input-wrap" [class.input-wrap--error]="hasError('email')" [class.input-wrap--valid]="isValid('email')">
                      <span class="material-icons-round input-icon">email</span>
                      <input
                        id="email"
                        type="email"
                        formControlName="email"
                        placeholder="voce@empresa.com.br"
                        autocomplete="email"
                        [attr.aria-describedby]="hasError('email') ? 'email-error' : null"
                        [attr.aria-invalid]="hasError('email')"
                      />
                      @if (isValid('email')) { <span class="material-icons-round input-valid-icon" aria-hidden="true">check_circle</span> }
                    </div>
                    @if (hasError('email')) {
                      <span id="email-error" class="field-error" role="alert">
                        <span class="material-icons-round">error</span>
                        {{ getError('email') }}
                      </span>
                    }
                  </div>

                  <!-- 2-col row: Company + Phone -->
                  <div class="field-row">
                    <div class="field-group">
                      <label for="company" class="field-label">Empresa <span class="required" aria-hidden="true">*</span></label>
                      <div class="input-wrap" [class.input-wrap--error]="hasError('company')" [class.input-wrap--valid]="isValid('company')">
                        <span class="material-icons-round input-icon">business</span>
                        <input id="company" type="text" formControlName="company" placeholder="Nome da empresa" autocomplete="organization" [attr.aria-invalid]="hasError('company')"/>
                      </div>
                      @if (hasError('company')) {
                        <span class="field-error" role="alert"><span class="material-icons-round">error</span> {{ getError('company') }}</span>
                      }
                    </div>
                    <div class="field-group">
                      <label for="phone" class="field-label">Telefone (opcional)</label>
                      <div class="input-wrap">
                        <span class="material-icons-round input-icon">phone</span>
                        <input id="phone" type="tel" formControlName="phone" placeholder="(11) 99999-9999" autocomplete="tel"/>
                      </div>
                    </div>
                  </div>

                  <!-- Fleet size -->
                  <div class="field-group">
                    <label for="driversCount" class="field-label">Quantidade de motoristas <span class="required" aria-hidden="true">*</span></label>
                    <div class="input-wrap input-wrap--select" [class.input-wrap--error]="hasError('driversCount')">
                      <span class="material-icons-round input-icon">local_shipping</span>
                      <select id="driversCount" formControlName="driversCount" [attr.aria-invalid]="hasError('driversCount')">
                        <option value="">Selecione</option>
                        <option value="1-5">1 a 5 motoristas</option>
                        <option value="6-20">6 a 20 motoristas</option>
                        <option value="21-50">21 a 50 motoristas</option>
                        <option value="51-100">51 a 100 motoristas</option>
                        <option value="100+">Mais de 100 motoristas</option>
                      </select>
                      <span class="material-icons-round select-arrow" aria-hidden="true">expand_more</span>
                    </div>
                    @if (hasError('driversCount')) {
                      <span class="field-error" role="alert"><span class="material-icons-round">error</span> Informe o tamanho da frota</span>
                    }
                  </div>

                  <!-- Message -->
                  <div class="field-group">
                    <label for="message" class="field-label">Mensagem (opcional)</label>
                    <div class="input-wrap input-wrap--textarea">
                      <span class="material-icons-round input-icon input-icon--top">chat_bubble</span>
                      <textarea
                        id="message"
                        formControlName="message"
                        rows="4"
                        placeholder="Conte brevemente sobre sua operação atual e o principal desafio de logística..."
                      ></textarea>
                    </div>
                    <span class="field-hint">{{ form.get('message')?.value?.length || 0 }}/500 caracteres</span>
                  </div>

                  <!-- LGPD consent -->
                  <div class="field-group field-group--checkbox" [class.field-group--checkbox-error]="hasError('lgpdConsent')">
                    <label class="checkbox-label">
                      <input type="checkbox" formControlName="lgpdConsent" [attr.aria-invalid]="hasError('lgpdConsent')" [attr.aria-describedby]="hasError('lgpdConsent') ? 'lgpd-error' : null"/>
                      <span class="checkbox-text">
                        Concordo com a
                        <a routerLink="/privacidade" target="_blank">Política de Privacidade</a>
                        e com o tratamento dos meus dados pessoais para fins de contato comercial, conforme a LGPD.
                      </span>
                    </label>
                    @if (hasError('lgpdConsent')) {
                      <span id="lgpd-error" class="field-error" role="alert"><span class="material-icons-round">error</span> Consentimento obrigatório</span>
                    }
                  </div>

                  <!-- Server error -->
                  @if (serverError()) {
                    <div class="server-error" role="alert">
                      <span class="material-icons-round">warning</span>
                      {{ serverError() }}
                    </div>
                  }

                  <!-- Submit -->
                  <button type="submit" class="submit-btn" [disabled]="submitting()" [attr.aria-busy]="submitting()">
                    @if (submitting()) {
                      <span class="spinner" aria-hidden="true"></span>
                      Enviando...
                    } @else {
                      <span class="material-icons-round">rocket_launch</span>
                      Agendar demonstração gratuita
                    }
                  </button>

                  <p class="form-footnote">
                    <span class="material-icons-round">shield</span>
                    Dados protegidos pela LGPD. Zero spam. Pode cancelar a qualquer momento.
                  </p>
                </form>
              </div>

            } @else {
              <!-- Success state -->
              <div class="contact-success" [@fadeSlide] role="alert" aria-live="polite">
                <div class="contact-success__icon" aria-hidden="true">
                  <span class="material-icons-round">check_circle</span>
                </div>
                <h2>Mensagem enviada!</h2>
                <p>Recebemos seu contato e um especialista da OptiFlow vai retornar em até <strong>2 horas</strong> no e-mail informado.</p>
                <p class="contact-success__what-next">Enquanto isso, que tal explorar:</p>
                <div class="contact-success__links">
                  <a routerLink="/funcionalidades" class="contact-success__link">
                    <span class="material-icons-round">grid_view</span> Funcionalidades
                  </a>
                  <a routerLink="/planos" class="contact-success__link">
                    <span class="material-icons-round">payments</span> Planos e preços
                  </a>
                </div>
              </div>
            }
          </div>

          <!-- Sidebar -->
          <aside class="contact-sidebar" [appAos]="'fade-left'" [aosDelay]="100">

            <div class="sidebar-card">
              <h3><span class="material-icons-round">chat_bubble_outline</span> Canal direto</h3>
              <ul class="sidebar-card__list">
                <li>
                  <span class="material-icons-round">email</span>
                  <div><strong>E-mail comercial</strong><br/>
                    <a href="mailto:contato@optiflow.com.br">contato&#64;optiflow.com.br</a>
                  </div>
                </li>
                <li>
                  <span class="material-icons-round">phone</span>
                  <div><strong>Telefone</strong><br/>
                    <a href="tel:+551140028922">(11) 4002-8922</a>
                  </div>
                </li>
                <li>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <div><strong>LinkedIn</strong><br/>
                    <a href="https://linkedin.com/company/optiflow" target="_blank" rel="noopener noreferrer">&#64;optiflow</a>
                  </div>
                </li>
              </ul>
            </div>

            <div class="sidebar-card">
              <h3><span class="material-icons-round">schedule</span> Horário de atendimento</h3>
              <ul class="hours-list">
                <li><span>Segunda a Sexta</span><span>08h – 18h</span></li>
                <li><span>Sábado</span><span>09h – 13h</span></li>
                <li class="closed"><span>Domingo</span><span>Fechado</span></li>
              </ul>
            </div>

            <div class="sidebar-card sidebar-card--highlight">
              <h3>Por que a OptiFlow?</h3>
              <ul class="why-list">
                <li><span class="material-icons-round">check_circle</span> Implementação em menos de 1 dia</li>
                <li><span class="material-icons-round">check_circle</span> 14 dias grátis sem cartão</li>
                <li><span class="material-icons-round">check_circle</span> Suporte em português</li>
                <li><span class="material-icons-round">check_circle</span> Dados 100% no Brasil</li>
                <li><span class="material-icons-round">check_circle</span> Cancele quando quiser</li>
              </ul>
            </div>

            <!-- Map placeholder -->
            <div class="sidebar-map" aria-label="Endereço: Av. Paulista, 1374 – São Paulo, SP">
              <div class="sidebar-map__placeholder" aria-hidden="true">
                <span class="material-icons-round">location_on</span>
              </div>
              <div class="sidebar-map__address">
                <strong>Av. Paulista, 1374 – 14º andar</strong><br/>
                <span>São Paulo, SP – CEP 01310-100</span>
              </div>
            </div>

          </aside>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .gradient-text { background: linear-gradient(135deg,#1A73E8,#9334E6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

    .contact-hero {
      padding: 72px 0;
      background: #0F172A;
      &__inner { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 20px; }
      &__title { font-size: clamp(2rem,4vw,3rem); color: #F1F5F9; font-weight: 800; letter-spacing: -.04em; line-height: 1.15; }
      &__subtitle { font-size: 1.0625rem; color: #94A3B8; }
    }

    .contact-content {
      &__grid { display: grid; grid-template-columns: 1fr 380px; gap: 48px; align-items: start;
        @media(max-width:1024px){grid-template-columns:1fr;} }
    }

    .contact-form-card {
      background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px;
      padding: 40px;
      h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 8px; }
      &__sub { font-size: .9375rem; color: var(--color-text-secondary); margin-bottom: 32px; line-height: 1.65; }
      form { display: flex; flex-direction: column; gap: 20px; }
      @media(max-width:640px){ padding: 24px; }
    }

    .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; @media(max-width:640px){grid-template-columns:1fr;} }

    .field-group { display: flex; flex-direction: column; gap: 6px; }
    .field-label { font-size: .875rem; font-weight: 600; color: var(--color-text-primary); .required { color: #EF4444; } }
    .field-hint { font-size: .8rem; color: var(--color-text-muted); }

    .input-wrap {
      position: relative; display: flex; align-items: center;
      .input-icon { position: absolute; left: 14px; font-size: 20px; color: var(--color-text-muted); pointer-events: none; &--top { top: 14px; align-self: flex-start; } }
      .input-valid-icon { position: absolute; right: 12px; font-size: 20px; color: #34A853; pointer-events: none; }
      .select-arrow { position: absolute; right: 12px; font-size: 20px; color: var(--color-text-muted); pointer-events: none; }
      input, textarea, select {
        width: 100%; padding: 12px 14px 12px 44px; font-family: var(--font-sans,'Inter',sans-serif);
        font-size: .9375rem; color: var(--color-text-primary); background: var(--color-surface-2);
        border: 1.5px solid var(--color-border); border-radius: 12px; outline: none; transition: border-color 200ms, box-shadow 200ms;
        &::placeholder { color: var(--color-text-muted); }
        &:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(26,115,232,.15); }
      }
      textarea { resize: vertical; min-height: 100px; padding-left: 44px; }
      select { appearance: none; cursor: pointer; }
      &--error input, &--error textarea, &--error select { border-color: #EF4444; &:focus { box-shadow: 0 0 0 3px rgba(239,68,68,.15); } }
      &--valid input { padding-right: 40px; }
    }

    .field-error { display: flex; align-items: center; gap: 4px; font-size: .8125rem; color: #EF4444; font-weight: 500; .material-icons-round { font-size: 16px; } }

    .field-group--checkbox {
      .checkbox-label { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; font-size: .875rem; line-height: 1.6; color: var(--color-text-secondary);
        input[type=checkbox] { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: var(--color-primary); cursor: pointer; }
        a { color: var(--color-primary); text-decoration: underline; text-underline-offset: 2px; }
      }
      &-error .checkbox-label { color: #EF4444; }
    }

    .server-error { display: flex; align-items: center; gap: 8px; padding: 14px 16px; background: rgba(239,68,68,.08); border: 1.5px solid rgba(239,68,68,.3); border-radius: 10px; font-size: .9rem; color: #EF4444; .material-icons-round { font-size: 20px; flex-shrink: 0; } }

    .submit-btn {
      width: 100%; padding: 16px; background: var(--color-primary); color: white; border: none; border-radius: 14px;
      font-family: var(--font-sans,'Inter',sans-serif); font-size: 1.0625rem; font-weight: 700; cursor: pointer; transition: all 200ms;
      display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 6px 20px rgba(26,115,232,.4);
      .material-icons-round { font-size: 20px; }
      &:hover:not(:disabled) { background: #1557B0; transform: translateY(-2px); }
      &:disabled { opacity: .65; cursor: not-allowed; transform: none; }
      &:focus-visible { outline: 3px solid var(--color-primary); outline-offset: 3px; }
    }

    .spinner { width: 20px; height: 20px; border: 2.5px solid rgba(255,255,255,.3); border-top-color: white; border-radius: 50%; animation: spin 650ms linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .form-footnote { display: flex; align-items: center; gap: 6px; font-size: .8125rem; color: var(--color-text-muted); justify-content: center; .material-icons-round { font-size: 16px; color: #34A853; } }

    .contact-success {
      background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 20px;
      padding: 56px 40px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px;
      &__icon { width: 80px; height: 80px; background: rgba(52,168,83,.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; .material-icons-round { font-size: 40px; color: #34A853; } }
      h2 { font-size: 1.75rem; font-weight: 800; }
      p { color: var(--color-text-secondary); max-width: 400px; line-height: 1.65; strong { color: var(--color-primary); } }
      &__what-next { font-weight: 600; color: var(--color-text-primary); }
      &__links { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
      &__link { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: 10px; font-size: .9rem; font-weight: 600; color: var(--color-text-primary); text-decoration: none; transition: all 200ms; .material-icons-round { font-size: 18px; color: var(--color-primary); } &:hover { border-color: var(--color-primary); } }
    }

    .contact-sidebar { display: flex; flex-direction: column; gap: 20px; position: sticky; top: 80px; }
    .sidebar-card {
      background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 16px; padding: 24px;
      h3 { display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 700; margin-bottom: 16px; .material-icons-round { font-size: 20px; color: var(--color-primary); } }
      &__list { display: flex; flex-direction: column; gap: 16px; li { display: flex; align-items: flex-start; gap: 12px; font-size: .9rem; strong { display: block; font-weight: 600; } a { color: var(--color-primary); text-decoration: none; font-size: .875rem; &:hover { text-decoration: underline; } } .material-icons-round { font-size: 20px; color: var(--color-primary); flex-shrink: 0; margin-top: 2px; } svg { flex-shrink: 0; margin-top: 4px; } } }
      &--highlight { background: linear-gradient(135deg, rgba(26,115,232,.06), rgba(147,52,230,.06)); border-color: rgba(26,115,232,.2); h3 { color: var(--color-primary); } }
    }

    .hours-list { display: flex; flex-direction: column; gap: 10px; li { display: flex; justify-content: space-between; font-size: .9rem; color: var(--color-text-secondary); &.closed span:last-child { color: var(--color-text-muted); } } }

    .why-list { display: flex; flex-direction: column; gap: 10px; li { display: flex; align-items: center; gap: 10px; font-size: .9rem; color: var(--color-text-secondary); .material-icons-round { font-size: 18px; color: #34A853; } } }

    .sidebar-map {
      border-radius: 16px; border: 1px solid var(--color-border); overflow: hidden;
      &__placeholder { height: 120px; background: linear-gradient(135deg, rgba(26,115,232,.08), rgba(147,52,230,.08)); display: flex; align-items: center; justify-content: center; .material-icons-round { font-size: 40px; color: var(--color-primary); opacity: .5; } }
      &__address { padding: 14px 16px; font-size: .875rem; color: var(--color-text-secondary); line-height: 1.6; strong { color: var(--color-text-primary); } }
    }
  `],
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  form!: FormGroup;
  submitting = signal(false);
  submitted = signal(false);
  serverError = signal<string | null>(null);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      company: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      phone: ['', Validators.maxLength(20)],
      driversCount: ['', Validators.required],
      message: ['', Validators.maxLength(500)],
      lgpdConsent: [false, Validators.requiredTrue],
    });
  }

  hasError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isValid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  getError(field: string): string {
    const control = this.form.get(field);
    if (!control?.errors) return '';
    if (control.errors['required']) return 'Campo obrigatório.';
    if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres.`;
    if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres.`;
    if (control.errors['email']) return 'Informe um e-mail válido.';
    return 'Valor inválido.';
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.submitting.set(true);
    this.serverError.set(null);

    const data: ContactFormData = {
      ...this.form.value,
      lgpdConsent: true,
    };

    this.contactService.submitContact(data).subscribe({
      next: () => {
        this.submitting.set(false);
        this.submitted.set(true);
      },
      error: (err: Error) => {
        this.submitting.set(false);
        this.serverError.set('Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo e-mail.');
      },
    });
  }
}
