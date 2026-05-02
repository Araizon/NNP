// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, 2200);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
  slides[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide]?.classList.add('active');
  dots[currentSlide]?.classList.add('active');
}

if (slides.length > 0) {
  setInterval(() => goToSlide(currentSlide + 1), 4500);
}

window.goToSlide = goToSlide;

// ===== FLOATING CONTACT MENU =====
function toggleContactMenu() {
  const menu = document.getElementById('floatMenu');
  if (menu) menu.classList.toggle('open');
}
window.toggleContactMenu = toggleContactMenu;

document.addEventListener('click', (e) => {
  const fc = document.getElementById('floatContact');
  if (fc && !fc.contains(e.target)) {
    document.getElementById('floatMenu')?.classList.remove('open');
  }
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-num');
      nums.forEach(n => animateCounter(n, parseInt(n.dataset.target)));
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelector('.stats-container') && counterObserver.observe(document.querySelector('.stats-container'));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.course-card, .why-card, .mission-card, .contact-card, .class-section, .about-hero-section').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== PARTICLES =====
function createParticles() {
  const bg = document.createElement('div');
  bg.className = 'particles-bg';
  document.body.prepend(bg);
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${Math.random() * 0.3};
    `;
    bg.appendChild(p);
  }
}
createParticles();

// ===== TOAST =====
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
window.showToast = showToast;

// ===== COURSE FILTER (courses page) =====
window.filterCourses = function(cls) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.class-section').forEach(s => {
    if (cls === 'all' || s.dataset.class === cls) s.style.display = '';
    else s.style.display = 'none';
  });
};

// ===== SEARCH (courses page) =====
window.searchCourses = function(val) {
  const q = val.toLowerCase();
  document.querySelectorAll('.course-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
};