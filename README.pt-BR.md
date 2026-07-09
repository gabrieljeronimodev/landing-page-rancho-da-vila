# Rancho da Vila — Landing Page

Site de marketing single-page de alta conversão para um restaurante brasileiro
de self-service ("self-service por quilo"), construído com React 19, Vite 8 e
TanStack Router. Todo o funil de conversão é ancorado em um **deeplink do
WhatsApp** — sem backend, sem formulários que postam dados em lugar algum, sem
pipeline de analytics. Apenas uma página rápida e otimizada para SEO que leva
visitantes com fome a mandar mensagem para o restaurante.

Uma versão em inglês deste documento está disponível em
[`README.md`](./README.md).

## Principais Recursos

- Hero animado com estatísticas via `CountUp` (motion) e fallback para
  `prefers-reduced-motion`
- Cards de serviço (Self-Service, Marmitex, Drive-Through) com imagens
  carregadas via `loading="lazy"`
- Seção de depoimentos com estrelas de avaliação e avatares
- Navbar fixa com `backdrop-blur` ativado em scroll
- Botão flutuante do WhatsApp (`WhatsAppFAB`) com animação de pulse + tooltip
- Barra de CTA fixa inferior em mobile (< 768px)
- Formulário de contato que compõe uma URL `wa.me` e abre o WhatsApp em nova aba
- Mapa do Google embutido (`output=embed`, sem chave de API)
- SEO: `lang="pt-BR"`, Open Graph, Twitter cards, `Schema.org` JSON-LD
  (`Restaurant`)
- Navegação suave por âncoras entre as seções
- Sistema duplo de design tokens (paleta hex da marca + paleta oklch do
  shadcn/ui)

---

## Índice

- [Stack Tecnológica](#stack-tecnológica)
- [Pré-requisitos](#pré-requisitos)
- [Começando](#começando)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Arquitetura](#arquitetura)
- [Configuração & Conteúdo](#configuração--conteúdo)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Testes](#testes)
- [Build & Deploy](#build--deploy)
- [Solução de Problemas](#solução-de-problemas)
- [Problemas Conhecidos & Roadmap](#problemas-conhecidos--roadmap)
- [Histórico do Projeto](#histórico-do-projeto)
- [Licença](#licença)

---

## Stack Tecnológica

| Camada             | Tecnologia                                          |
| ------------------ | --------------------------------------------------- |
| Linguagem          | TypeScript 5.8 (`strict: true`)                     |
| Runtime UI         | React 19.2                                          |
| Build Tool         | Vite 8.0                                            |
| Roteamento         | `@tanstack/react-router` 1.168 (config-based, SPA)  |
| Data Fetching      | `@tanstack/react-query` 5.83 (instalado, não usado) |
| Estilos            | Tailwind CSS 4.2 + `tw-animate-css`                 |
| Animação           | `motion` 12 (Framer Motion)                         |
| Ícones             | `lucide-react` 0.575                                |
| UI Kit             | shadcn/ui ("new-york") — 46 componentes instalados  |
| Gerenciador        | Bun 1.1+ (primário) / npm / yarn / pnpm (alt.)      |
| Lint / Format      | ESLint 9 + `typescript-eslint` + Prettier 3         |
| Template de origem | Lovable `tanstack_start_ts_2026-06-17`              |

---

## Pré-requisitos

- **Node.js** 20 ou superior (exigido pelo Vite 8)
- **Bun** 1.1 ou superior ([instalar](https://bun.sh/docs/install)) — outros
  gerenciadores também funcionam, ver [Começando](#começando)
- **Git** 2.20+

Não é necessário banco de dados, chaves de API nem variáveis de ambiente para
rodar o projeto localmente.

---

## Começando

### 1. Clonar o Repositório

```bash
git clone https://github.com/gabrieljeronimodev/landing-page-rancho-da-vila.git
cd landing-page-rancho-da-vila
```

### 2. Instalar Dependências

O repositório contém tanto `bun.lock` quanto `package-lock.json`. Escolha
**um** gerenciador e mantenha-se nele para evitar divergência de lockfiles.

```bash
# Bun (recomendado)
bun install
```

<details>
<summary>Gerenciadores alternativos</summary>

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install
```

</details>

### 3. Iniciar o Servidor de Desenvolvimento

```bash
bun run dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador. O Vite
expondo o servidor de dev na porta **5173** por padrão (sem override no
`vite.config.ts`).

Hot Module Replacement (HMR) está ativo — edições em `src/routes/index.tsx`
atualizam a página instantaneamente.

### 4. Verificar o Build (opcional)

```bash
bun run build      # gera ./dist/
bun run preview    # serve o build de produção localmente
```

---

## Scripts Disponíveis

| Comando             | Descrição                                                        |
| ------------------- | ---------------------------------------------------------------- |
| `bun run dev`       | Inicia o Vite dev server com HMR na `:5173`                      |
| `bun run build`     | Type-check + build de produção para `dist/`                      |
| `bun run build:dev` | Build em modo de desenvolvimento (sem minificar, com sourcemaps) |
| `bun run preview`   | Serve localmente o build de produção de `dist/`                  |
| `bun run lint`      | Roda o ESLint no código                                          |
| `bun run format`    | Roda o Prettier no código                                        |

Troque `bun run` por `npm run`, `yarn` ou `pnpm run` se escolheu outro
gerenciador.

---

## Arquitetura

### Estrutura de Diretórios

```
.
├── index.html                  # HTML shell: meta tags, OG, JSON-LD, fontes
├── vite.config.ts              # Vite + React + Tailwind 4 plugins
├── tsconfig.json               # TS strict, alias @/* -> ./src/*
├── components.json              # config do shadcn/ui (new-york, slate base)
├── eslint.config.js            # ESLint + typescript-eslint + prettier
├── .prettierrc                 # printWidth 100, aspas duplas, trailing comma all
├── src/
│   ├── main.tsx                # Bootstrap React + QueryClient + RouterProvider
│   ├── router.tsx              # TanStack Router (root + index "/")
│   ├── styles.css              # Tailwind 4 + tokens duplos + keyframe wa-pulse
│   ├── routes/
│   │   ├── index.tsx           # A LANDING PAGE — 880 linhas, 14 componentes
│   │   └── README.md           # (obsoleto) descreve TanStack Start file-based
│   ├── components/
│   │   └── ui/                  # 46 componentes shadcn/ui (template, em sua maioria não usados)
│   ├── hooks/
│   │   └── use-mobile.tsx       # useIsMobile() via matchMedia(768px) — não usado pela LP
│   ├── lib/
│   │   └── utils.ts             # cn() = twMerge(clsx(...))
│   └── assets/                  # Imagens locais: hero, about, cards, avatares
├── dist/                        # Saída do build de produção (gitignored)
└── .lovable/                    # Metadados Lovable (project.json, plan.md)
```

### Roteamento

O roteamento é configurado **manualmente** em `src/router.tsx` (não file-based,
apesar do que `src/routes/README.md` sugere — esse arquivo é boilerplate de
template obsoleto, herdado da origem em TanStack Start).

- `rootRoute` (`src/router.tsx:14`) envolve todos os outlets em um
  `QueryClientProvider`.
- `indexRoute` (`src/router.tsx:18`) registra `path: "/"` com o componente
  `LandingPage` importado de `./routes/index`.
- O router é exportado em `src/router.tsx:26` com `scrollRestoration: true`.

Há exatamente **uma rota navegável** (`/`). Toda a navegação entre seções é
feita por âncoras (`#services`, `#about`, `#testimonials`, `#contact`),
suavizada por `html { scroll-behavior: smooth }` em `styles.css:27`.

### Composição da Landing Page

A landing page inteira vive em `src/routes/index.tsx` como 14 funções de
componente inline. A ordem de composição segue a árvore renderizada:

| Componente        | Local                      | Papel                                                       |
| ----------------- | -------------------------- | ----------------------------------------------------------- |
| `LandingPage`     | `src/routes/index.tsx:38`  | Composição raiz: nav + seções + footer + fabs               |
| `TopWrapper`      | `src/routes/index.tsx:59`  | Wrapper fixo para a navbar                                  |
| `Navbar`          | `src/routes/index.tsx:67`  | Header com backdrop em scroll + links âncora + CTA WhatsApp |
| `Hero`            | `src/routes/index.tsx:115` | Hero full-bleed com badge, headline, CTAs, estatísticas     |
| `CountUp`         | `src/routes/index.tsx:200` | Contador `useInView` + `motion`; respeita reduced motion    |
| `TrustBar`        | `src/routes/index.tsx:231` | 4 cards animados (nota, avaliações, anos, pratos/mês)       |
| `Services`        | `src/routes/index.tsx:256` | 3 cards de serviço (Self-Service / Marmitex / Drive-Thru)   |
| `SectionHead`     | `src/routes/index.tsx:335` | Helper reutilizável eyebrow + H2 com `whileInView`          |
| `About`           | `src/routes/index.tsx:374` | História em 2 colunas + pontos + overlay na imagem          |
| `Testimonials`    | `src/routes/index.tsx:489` | 3 `motion.figure` com 5 estrelas                            |
| `CTASection`      | `src/routes/index.tsx:564` | Faixa de CTA full-width em gradiente                        |
| `Contact`         | `src/routes/index.tsx:599` | InfoRows + formulário que compõe `wa.me` + iframe do mapa   |
| `InfoRow`         | `src/routes/index.tsx:716` | Linha ícone + label + texto, opcionalmente em `<a>`         |
| `Footer`          | `src/routes/index.tsx:750` | Footer 3 colunas: social / links rápidos / contato          |
| `SocialLink`      | `src/routes/index.tsx:828` | Ícone social circular com hover (SVG inline)                |
| `WhatsAppFAB`     | `src/routes/index.tsx:851` | Botão flutuante verde com animação `wa-pulse`               |
| `MobileStickyCTA` | `src/routes/index.tsx:869` | Barra fixa inferior visível em `< 768px`                    |

As variants de animação reutilizáveis ficam no topo do arquivo:
`fadeUp` (`src/routes/index.tsx:29`) e `stagger` (`src/routes/index.tsx:33`).

### Sistema de Design

`src/styles.css` (174 linhas) contém **dois sistemas paralelos de tokens**:

1. **Tokens da marca** (`styles.css:7-25`) — `--color-primary: #C0392B`,
   `--color-secondary: #E67E22`, `--color-accent: #F39C12`, além de background,
   foreground, muted, card, border, sombras, raios e as duas fontes do Google
   (`Playfair Display` para display, `Outfit` para corpo). A landing page
   consome esses tokens via `var(--color-*)` em todo o `routes/index.tsx`.
2. **Tokens do shadcn/ui** (`styles.css:51-163`) — mapeamento Tailwind 4
   `@theme inline` + paletas oklch em light/dark. Consumidos pelos 46
   componentes não usados em `src/components/ui/*`, mas **não** pela landing
   page.

Como os dois namespaces divergem (`--color-primary` hex vs `--primary`
oklch), a landing page sempre usa `var(--color-*)` explicitamente — nunca
depende de utilitários Tailwind como `bg-primary` (que resolveria para o
cinza oklch do shadcn em vez do vermelho da marca).

O pulse do `WhatsAppFAB` está definido em `styles.css:31-35` como
`@keyframes wa-pulse` de 2.2s (escala 1 → 1.08 → 1).

### Fluxo de Dados

```
Visitante
   │
   ├──> scroll de âncora (#services / #about / #testimonials / #contact)
   │         │
   │         └──> motion `whileInView` dispara uma vez
   │
   ├──> qualquer CTA ──> window.open("https://wa.me/[WHATSAPP_NUMBER]?text=...")
   │
   └──> submit do formulário ──> compõe ?text= ──> window.open wa.me link
                                                              │
                                                              └──> WhatsApp app / web
```

Nenhuma requisição sai do browser além do redirect `wa.me`, do iframe do
Google Maps e do stylesheet das Google Fonts.

### Integrações Externas

1. **Deeplink do WhatsApp** — `https://wa.me/${CLIENT_WHATSAPP}` referenciado
   em 12+ lugares via a constante `WA_LINK` definida em
   `src/routes/index.tsx:27`. O handler de submit do formulário em
   `src/routes/index.tsx:601` URL-encoda `Nome / Telefone / Mensagem` e
   anexa como `?text=`.
2. **Embed do Google Maps** — `src/routes/index.tsx:700-709`, um `<iframe>`
   usando `https://maps.google.com/maps?q=...&output=embed` sem chave de API,
   carregado lazy (`loading="lazy"`,
   `referrerPolicy="no-referrer-when-downgrade"`).
3. **Schema.org JSON-LD** — `index.html:29-45` expõe um nó `Restaurant` com
   endereço, telefone, horário de funcionamento; útil para Google rich
   results.

---

## Configuração & Conteúdo

Todo o conteúdo de negócio está **hardcoded** em `src/routes/index.tsx`. As
constantes `CLIENT_WHATSAPP` e `WA_LINK` (`src/routes/index.tsx:26-27`) são os
únicos pontos referenciados de múltiplos lugares — todo o resto (endereço,
telefone, horário, estatísticas, depoimentos) é JSX inline.

Para adaptar este template a outro restaurante, edite:

| O quê                    | Onde                                         | Use Placeholder     |
| ------------------------ | -------------------------------------------- | ------------------- |
| Número WhatsApp          | `src/routes/index.tsx:26`                    | `[WHATSAPP_NUMBER]` |
| Endereço do negócio      | `src/routes/index.tsx` (InfoRows do Contact) | `[STREET_ADDRESS]`  |
| Telefone (exibido)       | `src/routes/index.tsx` (InfoRow do Contact)  | `[PHONE]`           |
| Horário de funcionamento | `src/routes/index.tsx` (InfoRow do Contact)  | `[HOURS]`           |
| Imagem de fundo do hero  | `src/assets/images/hero-bg.jpg`              | Substituir arquivo  |
| Imagens dos cards        | `src/assets/images/service-*.jpg`            | Substituir arquivos |
| Avatares dos depoimentos | `src/assets/*.jpg`                           | Substituir arquivos |
| Metadata SEO             | `index.html` (`<title>`, OG, JSON-LD)        | Substituir literais |

Substitua placeholders (`[...]`) pelos valores reais do restaurante antes de
fazer deploy. O `[WHATSAPP_NUMBER]` precisa estar em formato internacional,
apenas dígitos, código do país primeiro (ex.: `5511999999999` para Brasil).

---

## Variáveis de Ambiente

**Nenhuma obrigatória.** O projeto é uma SPA estática — sem backend, sem
segredos, sem credenciais.

Variáveis futuras opcionais (ainda não conectadas — ver
[Roadmap](#roadmap)) poderiam incluir:

| Variável                 | Objetivo                                 | Default           |
| ------------------------ | ---------------------------------------- | ----------------- |
| `VITE_WHATSAPP_NUMBER`   | Substituir o `CLIENT_WHATSAPP` hardcoded | literal hardcoded |
| `VITE_GOOGLE_MAPS_QUERY` | Substituir o `q=` hardcoded do iframe    | literal hardcoded |
| `VITE_BUSINESS_ADDRESS`  | Substituir o endereço no InfoRow         | literal hardcoded |
| `VITE_BUSINESS_PHONE`    | Substituir o telefone no InfoRow         | literal hardcoded |
| `VITE_BUSINESS_HOURS`    | Substituir o horário no InfoRow          | literal hardcoded |

O prefixo `VITE_*` é necessário para o Vite expor as variáveis ao bundle do
client (ver
[Vite env vars](https://vite.dev/guide/env-and-mode.html)).

---

## Testes

**Não há setup de testes** neste projeto. Nenhum runner de teste está
instalado ou configurado.

Stack futura sugerida (ainda não ativa):

- [Vitest](https://vitest.dev/) para testes unitários/de componente
- [@testing-library/react](https://testing-library.com/) para asserções de DOM
- [Playwright](https://playwright.dev/) para cobertura E2E da navegação por
  âncora, da composição do deeplink do WhatsApp e do fallback de reduced
  motion
- Mocks de rota/router-level uma vez que as rotas sejam extraídas

Até existir um runner, o lint é a verificação mais próxima:

```bash
bun run lint
bun run build   # type-checka via TS + Vite
```

---

## Build & Deploy

### Build de Produção

```bash
bun run build
```

Gera uma SPA estática totalmente pré-renderizada em `dist/`, contendo
`index.html` mais `assets/` (chunks JS/CSS com hashes e imagens). Nenhum
runtime Node é necessário em produção — qualquer host estático serve.

### Requisitos de Host SPA

Como o TanStack Router usa a History API e há só uma rota, o host precisa
**fazer fallback de todos os caminhos desconhecidos para `index.html`** para
que deep links e refreshes resolvam. Em VPS com nginx isso significa
`try_files $uri /index.html;`. Vercel, Netlify e Cloudflare Pages configuram
isso automaticamente quando o modo "SPA" é selecionado.

### Plataformas Recomendadas

Escolha uma e siga o guia oficial da plataforma para deploy de Vite:

- **Vercel** — <https://vercel.com/docs/frameworks/vite>
- **Netlify** — <https://docs.netlify.com/frameworks/vite/>
- **Cloudflare Pages** — <https://developers.cloudflare.com/pages/framework-guides/deploy-anything/#vite-project-structure>

Valores de configuração comuns às três:

| Campo                 | Valor                     |
| --------------------- | ------------------------- |
| Comando de build      | `bun run build`           |
| Diretório de saída    | `dist`                    |
| Comando de install    | `bun install` (ou seu PM) |
| Versão do Node        | 20+                       |
| Variáveis de ambiente | nenhuma obrigatória       |

### Preview Local do Build de Produção

```bash
bun run build
bun run preview
```

`vite preview` serve `dist/` em uma porta local (padrão `4173`) com fallback
SPA habilitado — útil para validar o artefato de produção antes do deploy.

---

## Solução de Problemas

### Porta 5173 já em uso

```bash
# Encontrar e matar o processo na porta
lsof -i :5173       # macOS / Linux
# ou usar outra porta
bun run dev -- --port 5174
```

### Conflito de lockfile (`bun.lock` vs `package-lock.json`)

Ambos os lockfiles existem no repositório, o que pode confundir
contribuidores. Escolha **um** gerenciador e adicione o outro lockfile ao
`.gitignore`. Se migrar para Bun:

```gitignore
# .gitignore
package-lock.json
pnpm-lock.yaml
yarn.lock
```

(Já parcialmente feito — ver `.prettierignore`, mas não `.gitignore`.)

### iframe do Google Maps bloqueado por Content-Security-Policy

Se fizer deploy sob um CSP estrito, autorize `https://maps.google.com` em
`frame-src` / `child-src`, caso contrário o mapa deixa de renderizar
silenciosamente.

### Google Fonts não carregam offline

As fontes são puxadas de `https://fonts.googleapis.com` via `index.html:24-26`
com `rel="preconnect"` e display `swap`. Se o ambiente de deploy não tiver
saída para internet, a página cai para os fallbacks `Georgia, serif`
(display) e `system-ui` (corpo) definidos em `styles.css:16`.

### `vite preview` sem history fallback

Se deep links retornam 404 no preview local, garanta que `vite preview` está
rodando (ele habilita fallback SPA automaticamente). Não sirva `dist/` com
`python -m http.server` — não há handler de fallback.

---

## Problemas Conhecidos & Roadmap

Esta seção é contexto honesto de débito técnico para futuros mantenedores —
não são problemas bloqueantes.

### Problemas Conhecidos

1. **46 componentes shadcn/ui não usados** — `src/components/ui/*` (accordion,
   dialog, sheet, sidebar, carousel, calendar, charts, etc.) foram instalados
   pelo template do Lovable. A landing page importa **zero** deles. As 26
   dependências peer `@radix-ui/react-*` permanecem em `package.json`. O
   tree-shaking as remove do bundle de produção, mas o `node_modules` infla e
   o escopo do lint sofre.
2. **`QueryClient` duplicado** — Uma instância é criada em `src/main.tsx:8`
   (envolvendo tudo) e outra dentro de `src/router.tsx:8`
   (`QueryClientProvider` aninhado em `RootRoute`). São duas instâncias
   separadas de cliente, nenhuma com `defaultOptions` customizadas. A interna
   deveria ser removida ou reaproveitada.
3. **`src/routes/README.md` obsoleto** — descreve TanStack Start file-based
   routing (`__root.tsx`, `routeTree.gen.ts`), mas o projeto usa roteamento
   manual baseado em config em `src/router.tsx`. O README é boilerplate de
   template e não reflete a realidade.
4. **Hook `useIsMobile` órfão** — `src/hooks/use-mobile.tsx` está definido mas
   nunca é importado por `routes/index.tsx` (a LP usa utilitários
   responsivos do Tailwind `md:` em vez disso).
5. **Sistemas duplos de cor em `styles.css`** — Dois blocos `:root` (linhas
   7-25 com tokens hex da marca; linhas 94-163 com tokens oklch do shadcn)
   coexistem com nomes divergentes. A landing page precisa usar sempre
   `var(--color-*)` explicitamente. Adotar um utilitário `bg-primary`
   resolveria para o cinza do shadcn, não para o vermelho da marca.
6. **Formulário de contato manual** — O formulário em
   `src/routes/index.tsx:629-696` usa `useState` puro apesar de
   `react-hook-form` + `zod` + `@hookform/resolvers` estarem instalados. Não
   há validação client-side além do HTML `required` e `maxLength`.
7. **`routes/index.tsx` monolítico** — 880 linhas, 14 componentes em um único
   arquivo. Candidato a extração: `src/components/sections/{Hero,Services,
About,Testimonials,CTA,Contact,Footer}.tsx`.
8. **Sem testes** — Passar no lint + `tsc` é a única verificação.
9. **Dados de negócio hardcoded** — Endereço, telefone, horário, número do
   WhatsApp, nota do Google, nomes dos depoimentos, caminhos das fotos —
   todos literais em JSX. Sem camada de config via env ou JSON.

### Roadmap

- Extrair componentes de seção de `routes/index.tsx` para
  `src/components/sections/`
- Externalizar dados de negócio para variáveis `VITE_*` ou um único módulo
  `content.ts`
- Unificar o sistema de design tokens (colapsar `--color-*` e `--primary*`
  em um único namespace; remapear tokens shadcn para a paleta da marca)
- Remover o `QueryClientProvider` redundante em `router.tsx`
- Adotar `react-hook-form` + `zod` no formulário de contato com mensagens
  pt-BR e feedback via toast `sonner`
- Deletar componentes não usados em `src/components/ui/*` (ou adotar alguns:
  `Button`, `Input`, `Form`, `Sonner`)
- Adicionar Vitest + Testing Library + um smoke test em Playwright que valide
  a composição do deeplink do WhatsApp no submit
- Substituir o `routes/README.md` por documentação precisa de roteamento ou
  removê-lo
- Adicionar um apontador ao arquivo `LICENSE` no `AGENTS.md`

---

## Histórico do Projeto

Este projeto foi originalmente gerado no [Lovable](https://lovable.dev) usando
o template `tanstack_start_ts_2026-06-17` (ver `.lovable/project.json`), que
produziu um projeto TanStack Start com roteamento file-based.

O commit `84a8097` (branch `migracao/tanstack-router`, mergeado via PR #2)
migraram o codebase de TanStack Start para TanStack Router em modo SPA,
substituindo o gerador de rotas file-based pela configuração explícita em
`src/router.tsx`. O `src/routes/README.md` obsoleto é o único artefato
sobrevivente do layout pré-migração.

PRs subsequentes (#1, #3) atualizaram dados de contato e trocaram imagens por
fotos armazenadas localmente em `src/assets/`.

O arquivo `AGENTS.md` na raiz do repositório contém um aviso gerenciado pelo
Lovable alertando contra reescrever histórico publicado no git.

---

## Licença

Distribuído sob a [Licença MIT](./LICENSE). Copyright (c) 2026
gabrieljeronimodev.
