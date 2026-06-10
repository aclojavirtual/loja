/* =============================================
   AC LOJA VIRTUAL — script.js
   Modular, limpo e sem dependências externas
============================================= */

'use strict';

// =============================================
// 1. UTILITÁRIOS
// =============================================

/**
 * Seleciona um elemento do DOM
 * @param {string} selector
 * @param {Element} [parent=document]
 */
const $ = (selector, parent = document) => parent.querySelector(selector);

/**
 * Seleciona múltiplos elementos do DOM
 */
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/**
 * Debounce: evita múltiplos disparos rápidos
 */
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// =============================================
// 2. ANO ATUAL NO FOOTER
// =============================================
function setCurrentYear() {
  const el = $('#currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

// =============================================
// 3. HEADER — scroll + mobile menu
// =============================================
function initHeader() {
  const header    = $('#header');
  const toggle    = $('#navToggle');
  const navLinks  = $('.nav__links');

  if (!header) return;

  // Adiciona classe .scrolled quando rola
  const onScroll = debounce(() => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, 50);
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu hambúrguer — toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
      // Impede scroll do body quando menu aberto
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fecha ao clicar em um link
    $$('.nav__link', navLinks).forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
      });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
      }
    });

    // Fecha com tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menu');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }
}

// =============================================
// 4. SCROLL ANIMATIONS (Intersection Observer)
// =============================================
function initReveal() {
  const elements = $$('.reveal');
  if (!elements.length) return;

  // Respeita prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // dispara só uma vez
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

// =============================================
// 5. FILTRO DE PRODUTOS
// =============================================
function initProductFilter() {
  const filterBtns = $$('.filter-btn');
  const products   = $$('.product-card');

  if (!filterBtns.length || !products.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Atualiza estado dos botões
      filterBtns.forEach(b => {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-pressed', 'true');

      // Filtra os produtos com animação
      products.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        if (match) {
          card.classList.remove('hidden');
          // Re-trigger animação de entrada
          card.classList.remove('visible');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.classList.add('visible');
            });
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// =============================================
// 6. FAQ — acessibilidade com details/summary
// =============================================
function initFAQ() {
  const items = $$('.faq__item');

  items.forEach(item => {
    const summary = $('summary', item);
    if (!summary) return;

    item.addEventListener('toggle', () => {
      summary.setAttribute('aria-expanded', String(item.open));
    });
  });
}

// =============================================
// 7. BOTÃO VOLTAR AO TOPO
// =============================================
function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  const onScroll = debounce(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, 50);

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =============================================
// 8. ACTIVE NAV LINK (scroll spy simples)
// =============================================
function initScrollSpy() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.style.color = isActive
              ? 'var(--clr-blue-500)'
              : '';
            link.style.fontWeight = isActive ? '700' : '';
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px'
    }
  );

  sections.forEach(s => observer.observe(s));
}

// =============================================
// 9. SUAVE SCROLL para links âncora
// =============================================
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = $(targetId);
      if (!target) return;

      e.preventDefault();
      const headerH = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--header-h')
      ) || 72;

      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// =============================================
// 10. LAZY LOADING de SVGs (performance)
// =============================================
function initLazyContent() {
  // Adiciona loading="lazy" em todos os svgs dentro de product-card__img
  // (já são inline, mas o observer garante renderização apenas quando visível)
  const imgWraps = $$('.product-card__img-wrap');

  if (!('IntersectionObserver' in window)) return;

  const imgObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          imgObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '200px' }
  );

  imgWraps.forEach(wrap => imgObserver.observe(wrap));
}

// =============================================
// 11. MICROINTERAÇÃO — botões WhatsApp
// =============================================
function initWhatsAppButtons() {
  $$('.btn--whatsapp').forEach(btn => {
    // Efeito de ripple ao clicar
    btn.addEventListener('click', function(e) {
      // Pequena vibração tátil se suportada
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }

      // Ripple visual
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.5s ease-out forwards;
        pointer-events: none;
      `;

      // Garante position: relative no botão
      if (getComputedStyle(this).position === 'static') {
        this.style.position = 'relative';
      }
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Adiciona a keyframe do ripple dinamicamente
  if (!$('#rippleStyle')) {
    const style = document.createElement('style');
    style.id = 'rippleStyle';
    style.textContent = `
      @keyframes rippleAnim {
        to { transform: scale(2.5); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// =============================================
// 12. TOOLTIP DO WHATSAPP FLOAT (mobile touch)
// =============================================
function initFloatTooltip() {
  const floatBtn = $('.whatsapp-float');
  const tooltip  = floatBtn && $('.whatsapp-float__tooltip', floatBtn);
  if (!floatBtn || !tooltip) return;

  // No mobile, mostra tooltip por 3s após tocar
  floatBtn.addEventListener('touchstart', () => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(-50%) translateX(0)';
    setTimeout(() => {
      tooltip.style.opacity = '';
      tooltip.style.transform = '';
    }, 3000);
  }, { passive: true });
}

// =============================================
// 13. CONTADOR DE ESTATÍSTICAS (hero)
// =============================================
function initCounters() {
  const stats = $$('.hero__stat-num');
  if (!stats.length) return;

  const parseValue = (text) => {
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el       = entry.target;
        const original = el.textContent;
        const target   = parseValue(original);
        const prefix   = original.match(/^[+]/) ? '+' : '';
        const suffix   = original.includes('%') ? '%' : '';
        const duration = 1500;
        const start    = performance.now();

        function update(now) {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased    = 1 - Math.pow(1 - progress, 3);
          const current  = Math.round(eased * target);

          el.textContent = `${prefix}${current.toLocaleString('pt-BR')}${suffix}`;

          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = original; // garante valor exato no final
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(stat => observer.observe(stat));
}

// =============================================
// 14. PARTÍCULAS FLUTUANTES no HERO (canvas)
// =============================================
function initHeroParticles() {
  const hero = $('.hero');
  if (!hero) return;

  // Não inicializa em dispositivos com baixa performance
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  `;
  hero.appendChild(canvas);

  const ctx   = canvas.getContext('2d');
  const COUNT = 40;
  let particles = [];
  let rafId;

  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  function createParticle() {
    return {
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.5 + 0.5,
      dx:   (Math.random() - 0.5) * 0.4,
      dy:   (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    rafId = requestAnimationFrame(draw);
  }

  init();
  draw();

  // Pausa ao sair da viewport para economizar recursos
  const heroObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!rafId) draw();
    } else {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });
  heroObserver.observe(hero);

  window.addEventListener('resize', debounce(() => {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }, 200));
}

// =============================================
// 15. ACTIVE LINK highlight ao clicar
// =============================================
function initNavHighlight() {
  $$('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      $$('.nav__link').forEach(l => {
        l.style.color = '';
        l.style.fontWeight = '';
      });
      link.style.color = 'var(--clr-blue-500)';
      link.style.fontWeight = '700';
    });
  });
}

// =============================================
// 16. PRELOADER (remove classe após carregamento)
// =============================================
function initPageLoad() {
  // Adiciona classe 'loaded' no body quando página estiver pronta
  if (document.readyState === 'complete') {
    document.body.classList.add('loaded');
  } else {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });
  }
}

// =============================================
// 17. PRODUCT CARD — efeito tilt 3D no hover (desktop)
// =============================================
function initCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return; // skip em touch
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  $$('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const tiltX  = ((y - cy) / cy) * 4;
      const tiltY  = ((x - cx) / cx) * -4;

      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// =============================================
// 18. NOTIFICAÇÃO TOAST (feedback ao clicar em WhatsApp)
// =============================================
function initToast() {
  // Cria container de toasts
  const container = document.createElement('div');
  container.id = 'toastContainer';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');
  container.style.cssText = `
    position: fixed;
    top: calc(var(--header-h, 72px) + 16px);
    right: 16px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: none;
  `;
  document.body.appendChild(container);

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bg = type === 'success' ? '#25D366' : '#1d4ed8';
    toast.style.cssText = `
      background: ${bg};
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      font-family: var(--font-body, sans-serif);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      pointer-events: none;
      transform: translateX(120%);
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease;
      opacity: 0;
    `;
    toast.textContent = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
      });
    });

    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 350);
    }, 3000);
  }

  // Mostra toast ao clicar em qualquer botão WhatsApp
  $$('.btn--whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('📲 Abrindo WhatsApp…');
    });
  });
}

// =============================================
// 19. SKIP LINK (acessibilidade)
// =============================================
function initSkipLink() {
  const existing = $('.skip-link');
  if (existing) return;

  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.className = 'skip-link';
  skip.textContent = 'Ir para o conteúdo principal';
  document.body.prepend(skip);
}

// =============================================
// INIT — executa tudo ao DOM estar pronto
// =============================================
function init() {
  setCurrentYear();
  initSkipLink();
  initHeader();
  initReveal();
  initProductFilter();
  initFAQ();
  initBackToTop();
  initScrollSpy();
  initSmoothScroll();
  initLazyContent();
  initWhatsAppButtons();
  initFloatTooltip();
  initCounters();
  initHeroParticles();
  initNavHighlight();
  initPageLoad();
  initCardTilt();
  initToast();
}

// Garante execução após o DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
