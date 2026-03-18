# OptiFlow — Site Institucional

Site institucional da **OptiFlow Logística Inteligente**, uma plataforma SaaS B2B de roteirização inteligente para frotas.

Desenvolvido com Angular 17+, componentes standalone e SCSS.

---

## Tecnologias

- [Angular 17](https://angular.dev) — framework principal
- TypeScript — linguagem
- SCSS — estilos com CSS Custom Properties e dark mode nativo
- Angular Animations — transições e efeitos
- Angular Reactive Forms — formulários com validação
- Angular Router — rotas com lazy loading e view transitions

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Home — hero, stats, como funciona, features, depoimentos, pricing preview |
| `/funcionalidades` | Detalhamento dos módulos: Roteirização, Motoristas, Analytics, Segurança |
| `/precos` | Planos Starter, Professional e Enterprise com tabela comparativa e FAQ |
| `/sobre` | Missão, visão, valores, timeline da empresa, time e stack tecnológica |
| `/contato` | Formulário de contato com validação LGPD |
| `/blog` | Artigos com filtro por categoria e busca |
| `/privacidade` | Política de privacidade (LGPD) |
| `/termos` | Termos de uso |

---

## Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- npm v9 ou superior

### Instalação

```bash
npm install --legacy-peer-deps
```

> O flag `--legacy-peer-deps` é necessário por incompatibilidade de peer deps entre Angular 17 e Node 20+.

### Desenvolvimento

```bash
npm start
```

Acesse em `http://localhost:4200`.

### Build de produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/optiflow-site/browser/`.

---

## Estrutura do projeto

```
src/
├── app/
│   ├── core/
│   │   └── services/        # analytics, seo, contact, theme
│   ├── layouts/
│   │   ├── main-layout/     # header + footer
│   │   └── minimal-layout/  # layout para páginas legais
│   ├── shared/
│   │   ├── components/      # button, badge, toast, stat-counter...
│   │   ├── directives/      # animate-on-scroll
│   │   └── pipes/           # currency-brl
│   └── features/
│       ├── home/
│       ├── features-page/
│       ├── pricing/
│       ├── about/
│       ├── contact/
│       ├── blog/
│       └── legal/
│           ├── privacy/
│           └── terms/
└── styles.scss              # design tokens e estilos globais
```

---

## Redes sociais

- Instagram: [@danieltomazii](https://instagram.com/danieltomazii)
- LinkedIn: [daniel-tomazi](https://www.linkedin.com/in/daniel-tomazi/)
- GitHub: [DanielTomazi](https://github.com/DanielTomazi)
