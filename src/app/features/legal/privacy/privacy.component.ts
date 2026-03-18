import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="legal-page">
      <div class="container legal-page__container">

        <header class="legal-page__header">
          <div class="legal-page__meta">
            <span>Última atualização: 1º de janeiro de 2024</span>
            <a routerLink="/termos" class="legal-page__other-link">Ver Termos de Uso →</a>
          </div>
          <h1>Política de Privacidade</h1>
          <p class="legal-page__intro">
            A OptiFlow Logística Inteligente Ltda. ("OptiFlow", "nós", "nosso") está profundamente comprometida
            com a privacidade e proteção de dados pessoais. Esta Política descreve como coletamos, usamos,
            armazenamos, compartilhamos e protegemos seus dados, em conformidade com a
            <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD)</strong>.
          </p>
          <div class="legal-page__summary">
            <h2>Resumo rápido</h2>
            <ul>
              <li><span class="material-icons-round">check_circle</span> Dados hospedados exclusivamente no Brasil (AWS São Paulo)</li>
              <li><span class="material-icons-round">check_circle</span> Nunca vendemos seus dados para terceiros</li>
              <li><span class="material-icons-round">check_circle</span> Você pode solicitar exclusão dos dados a qualquer momento</li>
              <li><span class="material-icons-round">check_circle</span> Criptografia de ponta a ponta em todos os dados em trânsito</li>
              <li><span class="material-icons-round">check_circle</span> Encarregado de Dados (DPO) designado e disponível</li>
            </ul>
          </div>
        </header>

        <div class="legal-toc">
          <h2>Sumário</h2>
          <ol>
            <li><a href="#identificacao">1. Identificação do Controlador</a></li>
            <li><a href="#dados-coletados">2. Dados Pessoais Coletados</a></li>
            <li><a href="#finalidades">3. Finalidades do Tratamento</a></li>
            <li><a href="#bases-legais">4. Bases Legais</a></li>
            <li><a href="#compartilhamento">5. Compartilhamento de Dados</a></li>
            <li><a href="#retencao">6. Retenção de Dados</a></li>
            <li><a href="#direitos">7. Seus Direitos (LGPD)</a></li>
            <li><a href="#seguranca">8. Segurança da Informação</a></li>
            <li><a href="#cookies">9. Cookies e Rastreadores</a></li>
            <li><a href="#transferencias">10. Transferências Internacionais</a></li>
            <li><a href="#menores">11. Menores de Idade</a></li>
            <li><a href="#dpo">12. Contato com o DPO</a></li>
            <li><a href="#atualizacoes">13. Atualizações desta Política</a></li>
          </ol>
        </div>

        <article class="legal-content">

          <section id="identificacao">
            <h2>1. Identificação do Controlador</h2>
            <p>OptiFlow Logística Inteligente Ltda., pessoa jurídica de direito privado, inscrita no CNPJ sob o número 00.000.000/0001-00, com sede na Avenida Paulista, 1374, 14º andar, São Paulo – SP, CEP 01310-100.</p>
            <p>Encarregado de Dados (DPO): privacidade&#64;optiflow.com.br</p>
          </section>

          <section id="dados-coletados">
            <h2>2. Dados Pessoais Coletados</h2>
            <h3>2.1 Dados de Clientes (Pessoas Jurídicas e seus representantes)</h3>
            <ul>
              <li>Nome completo, e-mail corporativo, cargo, telefone comercial</li>
              <li>CNPJ e dados da empresa contratante</li>
              <li>Dados de faturamento (para fins fiscais)</li>
              <li>Logs de acesso e uso da plataforma</li>
              <li>Registros de cookies e preferências de interface</li>
            </ul>
            <h3>2.2 Dados de Motoristas (Usuários do Aplicativo)</h3>
            <ul>
              <li>Nome, CPF, CNH e contato (fornecidos pelo cliente/empregador)</li>
              <li>Localização GPS em tempo real (apenas durante jornada ativa)</li>
              <li>Histórico de rotas executadas</li>
              <li>Fotos de comprovantes de entrega (se habilitado pelo cliente)</li>
              <li>Métricas de desempenho (tempo, velocidade média, ocorrências)</li>
            </ul>
            <h3>2.3 Dados de Destinatários</h3>
            <ul>
              <li>Nome, endereço de entrega, telefone de contato</li>
              <li>Confirmações de recebimento</li>
            </ul>
            <h3>2.4 Dados Coletados Automaticamente</h3>
            <ul>
              <li>Endereço IP, tipo de dispositivo, sistema operacional, navegador</li>
              <li>Páginas visitadas, duração da sessão, cliques e interações</li>
              <li>Identificadores de cookies e tokens de sessão</li>
            </ul>
          </section>

          <section id="finalidades">
            <h2>3. Finalidades do Tratamento</h2>
            <table>
              <thead><tr><th>Dados</th><th>Finalidade</th></tr></thead>
              <tbody>
                <tr><td>Dados do cliente</td><td>Prestação do serviço contratado, cobrança, suporte</td></tr>
                <tr><td>Dados de motorista</td><td>Roteirização, monitoramento de jornada, segurança</td></tr>
                <tr><td>Localização GPS</td><td>Otimização de rotas e rastreamento de entregas</td></tr>
                <tr><td>Dados de uso</td><td>Melhoria contínua da plataforma, analytics internos</td></tr>
                <tr><td>E-mail</td><td>Comunicações transacionais e, com consentimento, marketing</td></tr>
              </tbody>
            </table>
          </section>

          <section id="bases-legais">
            <h2>4. Bases Legais (Art. 7º e 11 da LGPD)</h2>
            <ul>
              <li><strong>Execução de contrato</strong> – tratamento necessário para cumprimento do contrato de prestação de serviços</li>
              <li><strong>Cumprimento de obrigação legal</strong> – retenção de logs conforme Marco Civil da Internet (5 anos)</li>
              <li><strong>Interesse legítimo</strong> – prevenção a fraudes, segurança da informação, analytics internos</li>
              <li><strong>Consentimento</strong> – comunicações de marketing, cookies não essenciais</li>
            </ul>
          </section>

          <section id="compartilhamento">
            <h2>5. Compartilhamento de Dados</h2>
            <p>A OptiFlow não comercializa dados pessoais. Compartilhamos dados apenas com:</p>
            <ul>
              <li><strong>AWS (Amazon Web Services)</strong> – infraestrutura de hospedagem, exclusivamente na região SA-EAST-1 (Brasil)</li>
              <li><strong>Stripe / Iugu</strong> – processamento de pagamentos. Nenhum dado de cartão transita nos servidores da OptiFlow</li>
              <li><strong>SendGrid</strong> – envio de e-mails transacionais</li>
              <li><strong>Autoridades competentes</strong> – quando exigido por lei, ordem judicial ou investigação de fraude</li>
            </ul>
            <p>Todos os suboperadores assinaram acordos de processamento de dados compatíveis com a LGPD.</p>
          </section>

          <section id="retencao">
            <h2>6. Retenção de Dados</h2>
            <ul>
              <li>Dados de conta ativa: durante toda a vigência do contrato</li>
              <li>Dados de conta encerrada: 3 anos após o encerramento (prazo prescricional civil)</li>
              <li>Logs de acesso: 6 meses (Marco Civil da Internet)</li>
              <li>Notas fiscais e dados de cobrança: 5 anos (Receita Federal)</li>
              <li>Localização GPS de motoristas: 90 dias após a rota</li>
            </ul>
          </section>

          <section id="direitos">
            <h2>7. Seus Direitos (Art. 18 da LGPD)</h2>
            <p>Você tem direito a:</p>
            <ul>
              <li><strong>Confirmação e acesso</strong> aos dados pessoais que tratamos sobre você</li>
              <li><strong>Correção</strong> de dados incompletos, inexatos ou desatualizados</li>
              <li><strong>Anonimização, bloqueio ou eliminação</strong> de dados desnecessários ou tratados em desconformidade</li>
              <li><strong>Portabilidade</strong> dos dados a outro fornecedor de serviço ou produto</li>
              <li><strong>Eliminação</strong> dos dados pessoais tratados com consentimento</li>
              <li><strong>Informação</strong> sobre compartilhamentos realizados</li>
              <li><strong>Revogação do consentimento</strong> a qualquer momento</li>
            </ul>
            <p>Para exercer seus direitos: privacidade&#64;optiflow.com.br | Prazo de resposta: até 15 dias corridos.</p>
          </section>

          <section id="seguranca">
            <h2>8. Segurança da Informação</h2>
            <p>A OptiFlow adota medidas técnicas e organizacionais robustas:</p>
            <ul>
              <li>Criptografia TLS 1.3 para dados em trânsito</li>
              <li>Criptografia AES-256 para dados em repouso</li>
              <li>Autenticação multifator (MFA) obrigatória para administradores</li>
              <li>Testes de penetração anuais por empresa terceira</li>
              <li>Programa de Bug Bounty ativo</li>
              <li>Treinamento semestral de LGPD para todos os colaboradores</li>
              <li>Plano de Resposta a Incidentes com notificação à ANPD em até 72h</li>
            </ul>
          </section>

          <section id="cookies">
            <h2>9. Cookies e Rastreadores</h2>
            <table>
              <thead><tr><th>Tipo</th><th>Finalidade</th><th>Duração</th></tr></thead>
              <tbody>
                <tr><td>Essenciais</td><td>Autenticação, segurança, preferências de sessão</td><td>Sessão / 30 dias</td></tr>
                <tr><td>Analytics</td><td>Google Analytics 4 (anonimizado)</td><td>2 anos</td></tr>
                <tr><td>Marketing</td><td>Apenas com consentimento explícito</td><td>90 dias</td></tr>
              </tbody>
            </table>
          </section>

          <section id="transferencias">
            <h2>10. Transferências Internacionais</h2>
            <p>A OptiFlow prioriza o armazenamento no Brasil. Eventuais transferências internacionais (ex: backups de contingência) são realizadas com países e organizações que fornecem nível adequado de proteção conforme o Art. 33 da LGPD.</p>
          </section>

          <section id="menores">
            <h2>11. Menores de Idade</h2>
            <p>A plataforma OptiFlow é destinada exclusivamente a pessoas jurídicas e profissionais adultos. Não coletamos conscientemente dados de menores de 18 anos. Caso identifique tal situação, entre em contato para a remoção imediata.</p>
          </section>

          <section id="dpo">
            <h2>12. Contato com o Encarregado de Dados (DPO)</h2>
            <div class="dpo-card">
              <span class="material-icons-round">shield</span>
              <div>
                <strong>Encarregado de Dados (DPO)</strong><br/>
                E-mail: privacidade&#64;optiflow.com.br<br/>
                Endereço: Av. Paulista, 1374, 14º andar – São Paulo/SP, CEP 01310-100<br/>
                Prazo de resposta: até 15 dias corridos.
              </div>
            </div>
          </section>

          <section id="atualizacoes">
            <h2>13. Atualizações desta Política</h2>
            <p>Esta Política pode ser atualizada periodicamente. Notificaremos usuários ativos por e-mail sobre alterações materiais com pelo menos 15 dias de antecedência. A data da última atualização está sempre indicada no topo deste documento.</p>
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
    }
    .legal-page__meta { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: .875rem; color: var(--color-text-muted); }
    .legal-page__other-link { color: var(--color-primary); text-decoration: none; font-weight: 600; &:hover { text-decoration: underline; } }
    .legal-page__intro { font-size: 1.0625rem; color: var(--color-text-secondary); line-height: 1.75; margin-bottom: 32px; }

    .legal-page__summary {
      background: linear-gradient(135deg,rgba(52,168,83,.06),rgba(26,115,232,.06)); border: 1px solid rgba(52,168,83,.2); border-radius: 16px; padding: 24px;
      h2 { font-size: 1rem; font-weight: 700; color: #34A853; margin-bottom: 12px; }
      ul { display: flex; flex-direction: column; gap: 8px; li { display: flex; align-items: center; gap: 8px; font-size: .9rem; .material-icons-round { font-size: 18px; color: #34A853; } } }
    }

    .legal-toc {
      background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: 16px; padding: 28px; margin-bottom: 48px;
      h2 { font-size: 1rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--color-text-secondary); margin-bottom: 16px; }
      ol { padding-left: 20px; display: flex; flex-direction: column; gap: 8px; li a { color: var(--color-primary); text-decoration: none; font-size: .9375rem; &:hover { text-decoration: underline; } } }
    }

    .legal-content {
      section { margin-bottom: 48px; h2 { font-size: 1.375rem; font-weight: 800; border-bottom: 2px solid var(--color-border); padding-bottom: 12px; margin-bottom: 20px; } h3 { font-size: 1.0625rem; font-weight: 700; margin: 20px 0 12px; } p { font-size: .9375rem; color: var(--color-text-secondary); line-height: 1.8; margin-bottom: 16px; } ul { display: flex; flex-direction: column; gap: 10px; padding-left: 20px; li { font-size: .9375rem; color: var(--color-text-secondary); line-height: 1.7; } } }
      table { width: 100%; border-collapse: collapse; border-radius: 12px; overflow: hidden; border: 1px solid var(--color-border); th { background: var(--color-surface-2); padding: 12px 16px; text-align: left; font-size: .8rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); } td { padding: 12px 16px; font-size: .9rem; color: var(--color-text-secondary); border-top: 1px solid var(--color-border); } }
    }

    .dpo-card { display: flex; align-items: flex-start; gap: 16px; padding: 20px; background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: 12px; .material-icons-round { font-size: 28px; color: var(--color-primary); flex-shrink: 0; } font-size: .9375rem; color: var(--color-text-secondary); line-height: 1.75; strong { color: var(--color-text-primary); display: block; margin-bottom: 4px; } }

    .legal-page__back { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--color-border); }
    .legal-back-btn { display: inline-flex; align-items: center; gap: 8px; color: var(--color-primary); font-weight: 600; text-decoration: none; .material-icons-round { font-size: 20px; } &:hover { text-decoration: underline; } }
  `],
})
export class PrivacyComponent {}
