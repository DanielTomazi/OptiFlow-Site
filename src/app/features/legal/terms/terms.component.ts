import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="legal-page">
      <div class="container legal-page__container">

        <header class="legal-page__header">
          <div class="legal-page__meta">
            <span>Última atualização: 1º de janeiro de 2024</span>
            <a routerLink="/privacidade" class="legal-page__other-link">Ver Política de Privacidade →</a>
          </div>
          <h1>Termos de Uso e Serviço</h1>
          <p class="legal-page__intro">
            Bem-vindo(a) à OptiFlow. Ao acessar ou utilizar nossa plataforma, você concorda com estes Termos de Uso.
            Leia atentamente antes de prosseguir. Em caso de dúvidas, acione nosso suporte em
            <a href="mailto:suporte@optiflow.com.br">suporte&#64;optiflow.com.br</a>.
          </p>
        </header>

        <div class="legal-toc">
          <h2>Sumário</h2>
          <ol>
            <li><a href="#partes">1. Partes e Objeto</a></li>
            <li><a href="#cadastro">2. Cadastro e Conta</a></li>
            <li><a href="#licenca">3. Licença de Uso</a></li>
            <li><a href="#planos">4. Planos e Pagamento</a></li>
            <li><a href="#uso-aceitavel">5. Uso Aceitável</a></li>
            <li><a href="#propriedade">6. Propriedade Intelectual</a></li>
            <li><a href="#dados">7. Dados e Privacidade</a></li>
            <li><a href="#disponibilidade">8. Disponibilidade (SLA)</a></li>
            <li><a href="#responsabilidade">9. Limitação de Responsabilidade</a></li>
            <li><a href="#rescisao">10. Rescisão</a></li>
            <li><a href="#foro">11. Foro e Lei Aplicável</a></li>
            <li><a href="#contato">12. Contato</a></li>
          </ol>
        </div>

        <article class="legal-content">

          <section id="partes">
            <h2>1. Partes e Objeto</h2>
            <p>Estes Termos regulam o relacionamento entre <strong>OptiFlow Logística Inteligente Ltda.</strong> ("OptiFlow"), CNPJ 00.000.000/0001-00, e o <strong>Cliente</strong>, pessoa jurídica que contratou os serviços mediante a aceitação destes Termos e criação de conta na plataforma.</p>
            <p>O objeto é a licença de uso do software OptiFlow, plataforma de roteirização inteligente, gestão de frota e analytics logístico, disponibilizada sob o modelo SaaS (Software as a Service).</p>
          </section>

          <section id="cadastro">
            <h2>2. Cadastro e Conta</h2>
            <ul>
              <li>O Cliente deve fornecer informações verdadeiras, completas e atualizadas no cadastro.</li>
              <li>A conta é de uso exclusivo do Cliente e de seus usuários autorizados. É vedado compartilhá-la com terceiros.</li>
              <li>O Cliente é responsável por todas as ações realizadas com suas credenciais.</li>
              <li>Em caso de suspeita de acesso não autorizado, o Cliente deve notificar imediatamente a OptiFlow.</li>
              <li>Cada plano possui limite de usuários administradores. Usuários operacionais (motoristas) não possuem limite definido no Starter e Professional (sujeito a fair use).</li>
            </ul>
          </section>

          <section id="licenca">
            <h2>3. Licença de Uso</h2>
            <p>Sujeito ao pagamento das taxas aplicáveis, a OptiFlow concede ao Cliente uma licença <strong>não exclusiva, intransferível e revogável</strong> para usar a plataforma exclusivamente para fins comerciais legítimos relacionados à gestão logística.</p>
            <p>É expressamente vedado:</p>
            <ul>
              <li>Sublicenciar, revender ou transferir o acesso à plataforma</li>
              <li>Realizar engenharia reversa, descompilação ou tentativa de extrair o código-fonte</li>
              <li>Usar a plataforma para treinar modelos de inteligência artificial de terceiros</li>
              <li>Criar produtos ou serviços que concorram diretamente com a OptiFlow usando dados da plataforma</li>
            </ul>
          </section>

          <section id="planos">
            <h2>4. Planos e Pagamento</h2>
            <h3>4.1 Assinatura e Cobrança</h3>
            <ul>
              <li>Os planos são cobrados mensalmente ou anualmente, conforme escolhido no momento da contratação.</li>
              <li>A cobrança é antecipada (pré-paga) via cartão de crédito ou boleto bancário.</li>
              <li>Valores são corrigidos anualmente pelo IGP-M ou índice substituto.</li>
            </ul>
            <h3>4.2 Período de Teste</h3>
            <p>Todos os planos incluem 14 (quatorze) dias de teste gratuito. Nenhum cartão de crédito é exigido para iniciar o teste. Ao final do período, sem contratação, a conta é automaticamente suspensa.</p>
            <h3>4.3 Cancelamento e Reembolso</h3>
            <ul>
              <li>O cancelamento pode ser solicitado a qualquer momento pelo painel do cliente.</li>
              <li>Não há reembolso proporcional para planos mensais cancelados no meio do ciclo.</li>
              <li>Para planos anuais, reembolso proporcional dos meses não utilizados, deduzido desconto de plano mensal.</li>
              <li>Não há multa de cancelamento antecipado.</li>
            </ul>
          </section>

          <section id="uso-aceitavel">
            <h2>5. Uso Aceitável</h2>
            <p>O Cliente compromete-se a não utilizar a plataforma para:</p>
            <ul>
              <li>Atividades ilegais, fraudulentas ou que violem direitos de terceiros</li>
              <li>Transmissão de malware, vírus ou código malicioso</li>
              <li>Sobrecarga intencional da infraestrutura (ataques de negação de serviço)</li>
              <li>Coleta não autorizada de dados de terceiros</li>
              <li>Violação de direitos de privacidade de motoristas ou destinatários</li>
            </ul>
            <p>A OptiFlow reserva-se o direito de suspender contas que violem estas condições, com notificação prévia sempre que possível.</p>
          </section>

          <section id="propriedade">
            <h2>6. Propriedade Intelectual</h2>
            <p>Todo o software, algoritmos, interfaces, marcas, logotipos e documentação da plataforma OptiFlow são de propriedade exclusiva da OptiFlow Logística Inteligente Ltda., protegidos pelas leis brasileiras de propriedade intelectual (Lei nº 9.610/1998 e Lei nº 9.279/1996).</p>
            <p>Os dados gerados e inseridos pelo Cliente na plataforma permanecem de propriedade do Cliente. A OptiFlow pode usar dados <strong>anonimizados e agregados</strong> para fins de melhoria do produto e pesquisa, sem identificar o Cliente ou seus usuários.</p>
          </section>

          <section id="dados">
            <h2>7. Dados e Privacidade</h2>
            <p>O tratamento de dados pessoais está regulamentado em nossa <a routerLink="/privacidade">Política de Privacidade</a>, que integra estes Termos por referência. O Cliente, ao utilizar a plataforma, atua como <strong>controlador</strong> dos dados de seus motoristas e destinatários, e a OptiFlow como <strong>operadora</strong>.</p>
          </section>

          <section id="disponibilidade">
            <h2>8. Disponibilidade (SLA)</h2>
            <table>
              <thead><tr><th>Plano</th><th>SLA de Uptime</th><th>Janela de Manutenção</th></tr></thead>
              <tbody>
                <tr><td>Starter</td><td>99,0%</td><td>Terças-feiras, 2h–4h (UTC-3)</td></tr>
                <tr><td>Professional</td><td>99,5%</td><td>Domingos, 3h–5h (UTC-3)</td></tr>
                <tr><td>Enterprise</td><td>99,9%</td><td>Negociada individualmente</td></tr>
              </tbody>
            </table>
            <p>Eventuais créditos por indisponibilidade não programada serão aplicados automaticamente na próxima fatura do Cliente.</p>
          </section>

          <section id="responsabilidade">
            <h2>9. Limitação de Responsabilidade</h2>
            <p>A OptiFlow fornece a plataforma "no estado em que se encontra". Não garantimos resultados específicos de desempenho logístico, já que estes dependem de variáveis externas (trânsito, clima, comportamento de motoristas).</p>
            <p>Em nenhuma hipótese a responsabilidade agregada da OptiFlow excederá o valor pago pelo Cliente nos últimos 12 (doze) meses de assinatura.</p>
            <p>A OptiFlow não se responsabiliza por lucros cessantes, danos indiretos ou consequentes.</p>
          </section>

          <section id="rescisao">
            <h2>10. Rescisão</h2>
            <p>Qualquer das partes pode rescindir o contrato sem justa causa mediante notificação prévia de 30 dias. A OptiFlow pode rescindir imediatamente em caso de:</p>
            <ul>
              <li>Uso em desconformidade com estes Termos</li>
              <li>Inadimplência superior a 30 dias</li>
              <li>Conduta que prejudique outros clientes ou a reputação da OptiFlow</li>
            </ul>
            <p>Após a rescisão, o Cliente tem 30 dias para exportar seus dados. Após esse prazo, os dados serão excluídos conforme a Política de Privacidade.</p>
          </section>

          <section id="foro">
            <h2>11. Foro e Lei Aplicável</h2>
            <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de São Paulo/SP para dirimir quaisquer controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.</p>
          </section>

          <section id="contato">
            <h2>12. Contato</h2>
            <div class="contact-card">
              <span class="material-icons-round">support_agent</span>
              <div>
                <strong>Suporte Técnico e Jurídico</strong><br/>
                E-mail: suporte&#64;optiflow.com.br<br/>
                Jurídico: juridico&#64;optiflow.com.br<br/>
                Endereço: Av. Paulista, 1374, 14º andar – São Paulo/SP, CEP 01310-100
              </div>
            </div>
          </section>

        </article>

        <div class="legal-page__back">
          <a routerLink="/" class="legal-back-btn">
            <span class="material-icons-round">arrow_back</span>
            Voltar para o início
          </a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .legal-page { padding: 48px 0 80px; min-height: 100vh; }
    .legal-page__container { max-width: 860px; }
    .legal-page__header {
      margin-bottom: 48px;
      h1 { font-size: clamp(2rem,4vw,2.75rem); font-weight: 800; letter-spacing: -.04em; margin: 12px 0 20px; }
      a { color: var(--color-primary); text-decoration: underline; }
    }
    .legal-page__meta { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: .875rem; color: var(--color-text-muted); }
    .legal-page__other-link { color: var(--color-primary); text-decoration: none; font-weight: 600; &:hover { text-decoration: underline; } }
    .legal-page__intro { font-size: 1.0625rem; color: var(--color-text-secondary); line-height: 1.75; }
    .legal-toc { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: 16px; padding: 28px; margin-bottom: 48px; h2 { font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--color-text-secondary); margin-bottom: 16px; } ol { padding-left: 20px; display: flex; flex-direction: column; gap: 8px; li a { color: var(--color-primary); text-decoration: none; font-size: .9375rem; &:hover { text-decoration: underline; } } } }
    .legal-content { section { margin-bottom: 48px; h2 { font-size: 1.375rem; font-weight: 800; border-bottom: 2px solid var(--color-border); padding-bottom: 12px; margin-bottom: 20px; } h3 { font-size: 1.0625rem; font-weight: 700; margin: 20px 0 12px; } p { font-size: .9375rem; color: var(--color-text-secondary); line-height: 1.8; margin-bottom: 16px; a { color: var(--color-primary); text-decoration: underline; } } ul { display: flex; flex-direction: column; gap: 10px; padding-left: 20px; li { font-size: .9375rem; color: var(--color-text-secondary); line-height: 1.7; } } } table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border); th { background: var(--color-surface-2); padding: 12px 16px; text-align: left; font-size: .8rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); } td { padding: 12px 16px; font-size: .9rem; color: var(--color-text-secondary); border-top: 1px solid var(--color-border); } } }
    .contact-card { display: flex; align-items: flex-start; gap: 16px; padding: 20px; background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: 12px; .material-icons-round { font-size: 28px; color: var(--color-primary); flex-shrink: 0; } font-size: .9375rem; color: var(--color-text-secondary); line-height: 1.75; strong { color: var(--color-text-primary); display: block; margin-bottom: 4px; } }
    .legal-page__back { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--color-border); }
    .legal-back-btn { display: inline-flex; align-items: center; gap: 8px; color: var(--color-primary); font-weight: 600; text-decoration: none; .material-icons-round { font-size: 20px; } &:hover { text-decoration: underline; } }
  `],
})
export class TermsComponent {}
