/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top = e.clientY + 'px';
  }, 60);
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== MOBILE NAV ===== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  if (isOpen) {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.cssText = `
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 70px; left: 0; right: 0;
      background: rgba(10,10,15,0.97);
      backdrop-filter: blur(20px);
      padding: 24px;
      gap: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    `;
  }
});

/* ===== SMOOTH NAV LINKS CLOSE ===== */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      navLinks.style.display = 'none';
    }
  });
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.section-tag, .section-title, .about-card, .skill-card, .project-card, .contact-item, .contact-card, .about-stats, .hero-tag');

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  const parent = el.closest('.skills-grid, .projects-list, .contact-links');
  if (parent) {
    const siblings = [...parent.children];
    const index = siblings.indexOf(el);
    if (index > 0) el.classList.add(`reveal-delay-${Math.min(index, 3)}`);
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--white)';
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

/* ===== SKILL CARD MAGNETIC HOVER ===== */
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `translateY(-6px) rotateX(${-y * 0.5}deg) rotateY(${x * 0.5}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
});

/* ===== HERO NAME GLITCH ON HOVER ===== */
const heroName = document.querySelector('.hero-name .accent');
if (heroName) {
  heroName.addEventListener('mouseenter', () => {
    heroName.style.textShadow = '2px 0 var(--accent2), -2px 0 rgba(200,240,90,0.5)';
    setTimeout(() => {
      heroName.style.textShadow = '';
    }, 200);
  });
}

/* ===== TYPING EFFECT FOR ROLE ===== */
const roleText = document.querySelector('.role-text');
if (roleText) {
  const text = roleText.textContent;
  roleText.textContent = '';
  let i = 0;
  const type = () => {
    if (i <= text.length) {
      roleText.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 60);
    }
  };
  setTimeout(type, 1200);
}

/* ===== PARTICLE TRAIL (subtle) ===== */
let lastParticle = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastParticle < 60) return;
  lastParticle = now;

  const hero = document.querySelector('.hero');
  if (!hero) return;
  const heroRect = hero.getBoundingClientRect();
  if (e.clientY < heroRect.bottom) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: 4px; height: 4px;
      border-radius: 50%;
      background: rgba(200,240,90,0.4);
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      pointer-events: none;
      z-index: 9997;
      transform: translate(-50%,-50%);
      animation: particleFade 0.6s ease forwards;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  }
});

/* Inject particle fade keyframe */
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFade {
    0% { opacity: 0.8; transform: translate(-50%,-50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%,-60px) scale(0); }
  }
`;
document.head.appendChild(style);
