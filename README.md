# AC Loja Virtual

> Site institucional com aparência de e-commerce — Garrafas térmicas, eletrônicos e brindes corporativos.

## 🚀 Demo

Acesse: [https://aclojavirtual.com.br](https://aclojavirtual.com.br)

---

## 📋 Sobre o projeto

A **AC Loja Virtual** é um site institucional premium desenvolvido com **HTML5, CSS3 e JavaScript puro**, sem frameworks ou bibliotecas externas. O design foi inspirado em marcas como Apple, Stanley e Samsung — transmitindo confiança, qualidade e modernidade.

Todos os botões de compra direcionam para o **WhatsApp** da empresa, sem checkout próprio.

---

## ✨ Funcionalidades

- Hero animado com partículas canvas e orbs em glassmorphism
- Catálogo com 12 produtos e filtros por categoria (Tudo / Térmica / Eletrônicos / Brindes)
- Scroll animations com Intersection Observer (reveal suave)
- Dark mode automático via `prefers-color-scheme`
- Menu mobile responsivo com animação hambúrguer
- Scroll spy — destaca link ativo na nav conforme seção visível
- Contador animado de estatísticas no hero
- Efeito tilt 3D nos cards de produto (desktop)
- Toast notification ao clicar nos botões de WhatsApp
- Botão WhatsApp flutuante com tooltip
- Botão "Voltar ao topo"
- FAQ interativo com `<details>/<summary>` acessível
- SEO completo: meta tags, Open Graph, Twitter Card, Schema.org (JSON-LD)
- PWA-ready: `manifest.json`
- `robots.txt` e `sitemap.xml` prontos

---

## 🛠 Tecnologias

| Tecnologia | Uso |
|-----------|-----|
| HTML5 semântico | Estrutura de conteúdo |
| CSS3 custom properties | Design system + dark mode |
| JavaScript ES6+ | Interatividade modular |
| Google Fonts (Inter + Poppins) | Tipografia |
| Intersection Observer API | Scroll animations |
| Canvas API | Partículas do hero |
| CSS Grid + Flexbox | Layout responsivo |

---

## 📁 Estrutura do projeto

```
ac-loja/
├── index.html          # Página principal
├── style.css           # Estilos organizados por seção
├── script.js           # JavaScript modular (18 funções)
├── manifest.json       # PWA manifest
├── robots.txt          # Diretivas para crawlers
├── sitemap.xml         # Mapa do site
├── README.md           # Este arquivo
└── assets/
    ├── icons/
    │   └── favicon.svg
    └── images/         # (para imagens futuras)
```

---

## ▶️ Como executar

O site funciona abrindo **apenas** o arquivo `index.html` no navegador — sem servidor, sem build, sem dependências locais.

```bash
# Clone o repositório
git clone https://github.com/seuusuario/ac-loja-virtual.git

# Abra no navegador
open ac-loja-virtual/index.html
```

Ou faça deploy direto no **GitHub Pages**:
1. Acesse Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` / `root`
4. Salve — o site estará online em `https://seuusuario.github.io/ac-loja-virtual/`

---

## 🔍 SEO

- `<title>` e `<meta description>` otimizados
- Open Graph (Facebook, LinkedIn)
- Twitter Card
- Schema.org JSON-LD (tipo: `Store`)
- `<link rel="canonical">`
- Hierarquia de headings correta (h1 → h2 → h3)
- `alt` em todas as imagens/SVGs
- `robots.txt` e `sitemap.xml`

---

## 📱 Responsividade

| Breakpoint | Layout |
|-----------|--------|
| < 640px   | Mobile: 1 coluna, menu hambúrguer |
| 640–1023px | Tablet: 2 colunas |
| ≥ 1024px  | Desktop: layout completo |

---

## ♿ Acessibilidade

- HTML semântico (`<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`)
- `aria-label`, `aria-expanded`, `aria-pressed` em elementos interativos
- Skip link para conteúdo principal
- Focus visível em todos os elementos interativos
- Contraste adequado (WCAG AA)
- Respeita `prefers-reduced-motion`
- Respeita `prefers-contrast: high`

---

## 📞 Contato

- **WhatsApp:** [+55 16 99234-7993](https://wa.me/5516992347993)
- **Instagram:** [@aclojavirtual](https://instagram.com/aclojavirtual)
- **E-mail:** contato@aclojavirtual.com.br

---

## 📄 Licença

© 2026 AC Loja Virtual. Todos os direitos reservados.
