/* ═══════════════════════════════════════════════════════════════
   script.js — Ken Andrei A. Batac Portfolio
   ─ Dark / Light mode toggle (persisted in localStorage)
   ─ Mobile nav toggle
   ─ Project modal open / close
   ─ Formspree contact form submission
   ─ Scroll reveal (IntersectionObserver)
════════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────
   PROJECT DATA
   ─ 4 real projects, each with its own folder:
       projects/01-todo-app/
       projects/02-weather-app/
       projects/03-grade-calculator/
       projects/04-expense-tracker/
   ─ To link a live demo, set `liveUrl`
   ─ To link your GitHub repo, set `repoUrl`
   ─ To use a real banner, set `bannerImg`
     (e.g. "projects/01-todo-app/preview.png")
───────────────────────────────────────────── */
// ── Projects array: index 0, 1, 2 must match
//    the onclick="openModal(0/1/2)" in index.html ──
const projects = [
  {
    // index 0 → Card 1: To-Do List App
    title:      "To-Do List App",
    tags:       ["HTML5", "CSS3", "JavaScript", "localStorage"],
    bannerImg:  "projects/01-todo-app/banner.svg",
    screenshots: [
      "projects/01-todo-app/screenshot-1.svg",
      "projects/01-todo-app/screenshot-2.svg",
      "projects/01-todo-app/screenshot-3.svg",
    ],
    problem:
      "Students and developers often lose track of daily tasks without a quick, lightweight tool that doesn't require sign-up or a backend.",
    process:
      "Built a fully client-side task manager using vanilla JavaScript. Tasks are stored in localStorage so they persist after closing the browser. Features include priority levels (Low / Medium / High), a filter system (All / Pending / Done), and a live stats counter.",
    result:
      "A clean, zero-dependency to-do app that works entirely in the browser — no server, no database, no login required. Fast to load and easy to extend.",
    // liveUrl: "projects/01-todo-app/index.html",
    // repoUrl: "https://github.com/KenAndrei16",
  },
  {
    // index 1 → Card 2: Weather App UI
    title:      "Weather App UI",
    tags:       ["HTML5", "CSS3", "JavaScript", "Mock API"],
    bannerImg:  "projects/02-weather-app/banner.svg",
    screenshots: [
      "projects/02-weather-app/screenshot-1.svg",
      "projects/02-weather-app/screenshot-2.svg",
      "projects/02-weather-app/screenshot-3.svg",
    ],
    problem:
      "Connecting to a live weather API requires API keys and a server — too much overhead for a portfolio demo. The goal was to show how a real weather app UI works without those constraints.",
    process:
      "Designed a weather dashboard with a search bar, quick-city shortcuts, a live clock, and a 5-day forecast. Weather data for 5 cities is stored in a separate data.js file that mirrors a real OpenWeatherMap API response. Celsius/Fahrenheit toggling and dynamic background themes per city are fully implemented.",
    result:
      "A visually polished weather app UI that demonstrates API-driven design patterns. Swapping the mock data for real fetch() calls to OpenWeatherMap would make it fully production-ready.",
    // liveUrl: "projects/02-weather-app/index.html",
    // repoUrl: "https://github.com/KenAndrei16",
  },
  {
    // index 2 → Card 3: Expense Tracker
    title:      "Expense Tracker",
    tags:       ["HTML5", "CSS3", "JavaScript", "localStorage"],
    bannerImg:  "projects/04-expense-tracker/banner.svg",
    screenshots: [
      "projects/04-expense-tracker/screenshot-1.svg",
      "projects/04-expense-tracker/screenshot-2.svg",
      "projects/04-expense-tracker/screenshot-3.svg",
    ],
    problem:
      "Keeping track of daily spending as a student is difficult without a simple tool that doesn't require creating an account or syncing to the cloud.",
    process:
      "Built a single-page expense tracker with income and expense types, 7 spending categories, and real-time balance calculation. Transactions persist in localStorage. Includes a spending progress bar (turns red above 80%), a per-category breakdown with proportional bars, and a filterable transaction history.",
    result:
      "A practical personal finance tool covering full CRUD — add, view, filter, and delete transactions — with a clean dashboard that gives an instant snapshot of financial health.",
    // liveUrl: "projects/04-expense-tracker/index.html",
    // repoUrl: "https://github.com/KenAndrei16",
  },
];


/* ─────────────────────────────────────────────
   DARK / LIGHT MODE TOGGLE
───────────────────────────────────────────── */
(function applySavedTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

function toggleTheme() {
  const html    = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', toggleTheme);
});


/* ─────────────────────────────────────────────
   MOBILE NAVIGATION
───────────────────────────────────────────── */
function toggleNav() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}

function closeNav() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.remove('open');
}


/* ─────────────────────────────────────────────
   PROJECT MODAL
───────────────────────────────────────────── */
function openModal(index) {
  const p = projects[index];
  if (!p) return;

  document.getElementById('modalTitle').textContent   = p.title;
  document.getElementById('modalProblem').textContent = p.problem;
  document.getElementById('modalProcess').textContent = p.process;
  document.getElementById('modalResult').textContent  = p.result;

  // Tags
  document.getElementById('modalTags').innerHTML = p.tags
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  // ── Banner image ──
  const banner = document.getElementById('modalBanner');
  if (p.bannerImg) {
    banner.innerHTML = `
      <img src="${p.bannerImg}" alt="${p.title} banner"
           style="width:100%;height:100%;object-fit:cover;display:block;" />
      <button class="modal-close" onclick="closeModalBtn()" aria-label="Close">✕</button>`;
  } else {
    banner.innerHTML = `
      <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
      <span>Project Banner</span>
      <button class="modal-close" onclick="closeModalBtn()" aria-label="Close">✕</button>`;
  }

  // ── Screenshot gallery (3 images) ──
  const gallery = document.getElementById('modalGallery');
  if (p.screenshots && p.screenshots.length) {
    gallery.innerHTML = p.screenshots.map((src, i) => `
      <div class="gallery-img">
        <img src="${src}" alt="${p.title} screenshot ${i + 1}"
             style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />
      </div>`).join('');
  } else {
    gallery.innerHTML = `
      <div class="gallery-img">Screenshot 1</div>
      <div class="gallery-img">Screenshot 2</div>
      <div class="gallery-img">Screenshot 3</div>`;
  }

  // ── Optional Live Demo / View Code buttons ──
  const existingActions = document.getElementById('modalActions');
  if (existingActions) existingActions.remove();

  if (p.liveUrl || p.repoUrl) {
    const actions = document.createElement('div');
    actions.id = 'modalActions';
    actions.style.cssText = 'display:flex;gap:.75rem;margin-top:1.5rem;flex-wrap:wrap;';

    if (p.liveUrl) {
      actions.innerHTML += `
        <a href="${p.liveUrl}" target="_blank" class="btn-primary" style="font-size:.85rem;padding:.65rem 1.25rem;">
          Live Demo
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>`;
    }
    if (p.repoUrl) {
      actions.innerHTML += `
        <a href="${p.repoUrl}" target="_blank" class="btn-secondary" style="font-size:.85rem;padding:.65rem 1.25rem;">
          View Code
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </a>`;
    }
    document.querySelector('.modal-body').appendChild(actions);
  }

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (event.target === document.getElementById('modalOverlay')) closeModalBtn();
}

function closeModalBtn() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModalBtn();
});


/* ─────────────────────────────────────────────
   FORMSPREE CONTACT FORM
───────────────────────────────────────────── */
async function handleFormSubmit(event) {
  event.preventDefault();

  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusEl  = document.getElementById('formStatus');

  statusEl.textContent = '';
  statusEl.className   = 'form-status';
  submitBtn.disabled   = true;
  submitBtn.textContent = 'Sending…';

  try {
    const response = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      statusEl.textContent = "✓ Message sent! I'll get back to you soon.";
      statusEl.classList.add('success');
      form.reset();
    } else {
      const data = await response.json();
      const msg  = (data.errors && data.errors.map(e => e.message).join(', '))
                   || 'Something went wrong. Please try again.';
      statusEl.textContent = `✗ ${msg}`;
      statusEl.classList.add('error');
    }
  } catch (err) {
    statusEl.textContent = '✗ Network error. Please check your connection.';
    statusEl.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Send Message
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
      </svg>`;
  }
}


/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});