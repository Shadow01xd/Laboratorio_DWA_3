// =========================
// Navbar scroll effect
// =========================
function applyNavbarScrollState() {
    const navbar = document.getElementById('mainNav');
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', applyNavbarScrollState);
  document.addEventListener('DOMContentLoaded', applyNavbarScrollState);
  
  // =========================
  // DOMContentLoaded setup
  // =========================
  document.addEventListener('DOMContentLoaded', () => {
    // -------------------------
    // Partículas (si existe #particles)
    // -------------------------
    (function createParticles() {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
      }
    })();

    (function cardTextScrollIndicators() {
      const areas = document.querySelectorAll('.project-card .card-text');
      if (!areas.length) return;

      function ensureIndicators(area) {
        const overflow = area.scrollHeight > area.clientHeight + 2;
        if (!overflow) {
          // No overflow: limpiar
          area.classList.remove('scroll-decorated', 'has-top', 'has-bottom');
          const body = area.closest('.card-body');
          body && body.querySelectorAll('.scroll-arrow[data-for="desc"]').forEach(el => el.remove());
          return;
        }

        // Crear si faltan
        if (!area.classList.contains('scroll-decorated')) {
          area.classList.add('scroll-decorated');
          const body = area.closest('.card-body');
          if (!body) return;

          const up = document.createElement('button');
          up.type = 'button';
          up.className = 'scroll-arrow arrow-up';
          up.setAttribute('data-for', 'desc');
          up.setAttribute('aria-label', 'Desplazar arriba');
          up.innerHTML = '<i class="bi bi-chevron-up"></i>';

          const down = document.createElement('button');
          down.type = 'button';
          down.className = 'scroll-arrow arrow-down';
          down.setAttribute('data-for', 'desc');
          down.setAttribute('aria-label', 'Desplazar abajo');
          down.innerHTML = '<i class="bi bi-chevron-down"></i>';

          body.appendChild(up);
          body.appendChild(down);

          function positionArrows() {
            const rectTop = area.offsetTop;
            const rectBottomTop = rectTop + area.clientHeight - 22 - 4; // 22px btn height + 4px pad
            up.style.top = (rectTop + 4) + 'px';
            down.style.top = (rectBottomTop) + 'px';
          }

          positionArrows();
          window.addEventListener('resize', positionArrows);

          up.addEventListener('click', e => {
            e.stopPropagation();
            area.scrollBy({ top: -48, behavior: 'smooth' });
          });
          down.addEventListener('click', e => {
            e.stopPropagation();
            area.scrollBy({ top: 48, behavior: 'smooth' });
          });

          area.addEventListener('scroll', () => updateArrows(area));
        }

        updateArrows(area);
      }

      function updateArrows(area) {
        const hasTop = area.scrollTop > 0;
        const hasBottom = area.scrollTop + area.clientHeight < area.scrollHeight - 1;
        area.classList.toggle('has-top', hasTop);
        area.classList.toggle('has-bottom', hasBottom);
      }

      const ro = new ResizeObserver(() => {
        areas.forEach(a => ensureIndicators(a));
      });

      areas.forEach(area => {
        ensureIndicators(area);
        ro.observe(area);
      });
      window.addEventListener('load', () => areas.forEach(a => ensureIndicators(a)));
    })();

    // -------------------------
    // Smooth scroll interno para anclas
    // -------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href.length <= 1) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  
    // -------------------------
    // Tooltips de Bootstrap
    // -------------------------
    if (window.bootstrap) {
      const triggers = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      triggers.forEach(el => new bootstrap.Tooltip(el));
    }
  
    // -------------------------
    // Animaciones de entrada con IntersectionObserver
    // -------------------------
    (function entryAnimations() {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('animate');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
      document
        .querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .rotate-in')
        .forEach(el => observer.observe(el));
    })();
  
    // -------------------------
    // Animación de cubo (si existe .cube-3d)
    // -------------------------
    (function cubeSpin() {
      const cube = document.querySelector('.cube-3d');
      if (!cube) return;
      let rotation = 0;
      setInterval(() => {
        rotation += 0.5;
        cube.style.transform =
          `translateX(-50%) rotateX(${45 + Math.sin(rotation * 0.01) * 10}deg) rotateY(${45 + rotation}deg)`;
      }, 50);
    })();
  
    (function showAllProjectBadges() {
      const containers = document.querySelectorAll('.project-card .card-body .d-flex.flex-wrap.gap-2.mb-3');
      containers.forEach(container => {
        container.classList.remove('align-items-center');
        container.querySelectorAll('.badge').forEach(b => b.classList.remove('d-none'));
        container.querySelectorAll('.badge-toggle').forEach(btn => btn.remove());
      });
    })();
  
    // -------------------------
    // Minijuego (sólo si existe #gameContainer)
    // -------------------------
    (function miniGame() {
      const gameContainer = document.getElementById('gameContainer');
      if (!gameContainer) return;
  
      const ball = document.createElement('div');
      ball.className = 'ball';
      gameContainer.appendChild(ball);
  
      // Variables del juego
      let ballX = window.innerWidth * 0.7;
      let ballY = 100;
      let ballSpeed = 3;
      let ballRotation = 0;
      const ballRadius = 17.5;
      const boxSize = 80;
  
      // Sistema de cuadros
      const boxes = [];
      let pathIndex = 0;
  
      function createBox(x, y) {
        const box = document.createElement('div');
        box.className = 'box appearing';
        box.style.left = x + 'px';
        box.style.top = y + 'px';
        gameContainer.appendChild(box);
  
        setTimeout(() => box.classList.remove('appearing'), 400);
  
        return { element: box, x, y, width: boxSize, height: boxSize, visited: false };
      }
  
      function removeBox(box) {
        if (!box?.element?.parentNode) return;
        box.element.classList.add('disappearing');
        setTimeout(() => { if (box.element.parentNode) box.element.remove(); }, 300);
      }
  
      function initializePath() {
        let currentX = ballX - boxSize / 2;
        let currentY = ballY + 60;
        for (let i = 0; i < 3; i++) {
          const b = createBox(currentX, currentY);
          boxes.push(b);
          const direction = Math.random();
          if (direction < 0.4 && currentX > 100) currentX -= boxSize;           // izquierda
          else if (direction < 0.7 && currentX < window.innerWidth - boxSize - 100) currentX += boxSize; // derecha
          currentY += boxSize; // bajar
        }
      }
  
      function updateGame() {
        if (boxes.length === 0) return;
        const targetBox = boxes[pathIndex];
        if (!targetBox) { pathIndex = 0; return; }
  
        const targetCenterX = targetBox.x + boxSize / 2;
        const targetCenterY = targetBox.y + boxSize / 2;
  
        const dx = targetCenterX - ballX;
        const dy = targetCenterY - ballY;
        const distance = Math.hypot(dx, dy);
  
        if (distance > 5) {
          ballX += (dx / distance) * ballSpeed;
          ballY += (dy / distance) * ballSpeed;
          ballRotation += ballSpeed * 3;
          ball.style.transform = `rotate(${ballRotation}deg)`;
        } else {
          targetBox.visited = true;
          if (pathIndex > 0) removeBox(boxes[pathIndex - 1]);
          pathIndex++;
          if (pathIndex >= boxes.length - 1) {
            const last = boxes[boxes.length - 1];
            let nextX = last.x;
            let nextY = last.y + boxSize;
            const dir = Math.random();
            if (dir < 0.35 && nextX > 100) nextX -= boxSize;
            else if (dir < 0.7 && nextX < window.innerWidth - boxSize - 100) nextX += boxSize;
            boxes.push(createBox(nextX, nextY));
          }
        }
  
        if (ballY > window.innerHeight + 100) {
          boxes.forEach(b => b.element?.parentNode && b.element.remove());
          boxes.length = 0;
          ballY = 100; ballX = window.innerWidth * 0.7; ballRotation = 0; pathIndex = 0;
          initializePath();
        }
  
        ball.style.left = (ballX - ballRadius) + 'px';
        ball.style.top = (ballY - ballRadius) + 'px';
  
        requestAnimationFrame(updateGame);
      }
  
      initializePath();
      setTimeout(updateGame, 100);
    })();
  
    // -------------------------
    // Contact form (si existe)
    // -------------------------
    (function contactFormHandler() {
      const form = document.getElementById('contactForm');
      if (!form) return;
  
      form.addEventListener('submit', function (event) {
        event.preventDefault();
  
        if (!form.checkValidity()) {
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }
  
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
  
        form.reset();
        form.classList.remove('was-validated');
  
        Array.from(form.querySelectorAll('.is-valid, .is-invalid'))
          .forEach(el => el.classList.remove('is-valid', 'is-invalid'));
  
        form.querySelectorAll('select').forEach(s => (s.selectedIndex = 0));
        form.querySelectorAll('input[type="checkbox"]').forEach(c => (c.checked = false));
      });
    })();
  
    // -------------------------
    // BLOG: Búsqueda y Filtros (solo d-none)
    // -------------------------
    (function blogFilters() {
      const searchInput = document.getElementById('blogSearch');
      const categorySelect = document.getElementById('blogCategory');
      const articlesContainer = document.getElementById('blogArticles');
      if (!searchInput || !categorySelect || !articlesContainer) return;
  
      const articles = Array.from(articlesContainer.querySelectorAll('.blog-article'));
  
      function renderNoResults(visibleCount) {
        let msg = document.getElementById('noResultsMessage');
        if (visibleCount === 0) {
          if (!msg) {
            msg = document.createElement('div');
            msg.id = 'noResultsMessage';
            msg.className = 'col-12 text-center py-4';
            msg.innerHTML = `
              <div class="card">
                <div class="card-body p-4">
                  <i class="bi bi-search" style="font-size:3rem; color: var(--bs-primary);"></i>
                  <h3 class="mt-3 mb-2">No se encontraron artículos</h3>
                  <p class="text-white-50 mb-0">Intenta con otros términos de búsqueda o cambia la categoría.</p>
                </div>
              </div>`;
            articlesContainer.appendChild(msg);
          }
        } else if (msg) {
          msg.remove();
        }
      }
  
      function filter() {
        const term = (searchInput.value || '').toLowerCase().trim();
        const cat = (categorySelect.value || '').toLowerCase();
        let visible = 0;
  
        articles.forEach(card => {
          const aCat = (card.dataset.category || '').toLowerCase();
          const title = (card.querySelector('.blog-title')?.textContent || '').toLowerCase();
          const desc  = (card.querySelector('.blog-description')?.textContent || '').toLowerCase();
  
          const okCat = !cat || aCat === cat;
          const okTxt = !term || (title + ' ' + desc).includes(term);
          const show  = okCat && okTxt;
  
          // Usar SOLO d-none para mostrar/ocultar (nada de style.display)
          card.classList.toggle('d-none', !show);
          if (show) visible++;
        });
  
        renderNoResults(visible);
      }
  
      searchInput.addEventListener('input', filter);
      categorySelect.addEventListener('change', filter);
  
      // Primera pasada
      filter();
    })();
  });
  