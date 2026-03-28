<<<<<<< HEAD
// ===== ANIMATED DOT CANVAS BACKGROUND =====
const canvas = document.getElementById('dotCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, dots = [], mouse = { x: -999, y: -999 };
  const DOT_SPACING = 38;
  const DOT_R = 1.2;
  const ACCENT = [0, 232, 122];

  function resize() {
    w = canvas.width  = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(w / DOT_SPACING) + 1;
    const rows = Math.ceil(h / DOT_SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ x: c * DOT_SPACING, y: r * DOT_SPACING, bright: 0 });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach(d => {
      const dx = d.x - mouse.x, dy = d.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / 160);
      d.bright += (proximity - d.bright) * 0.12;
      const alpha = 0.12 + d.bright * 0.65;
      const r = DOT_R + d.bright * 1.5;
      ctx.beginPath();
      ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  window.addEventListener('resize', resize);
  resize();
  draw();
}

// ===== SCROLL REVEAL =====
const targets = [
  '.stat-card','.skill-card','.contact-method',
  '.about-text','.about-stats','.contact-form',
  '.contact-info','.timeline-item','.skills-note'
];
document.querySelectorAll(targets.join(',')).forEach(el => el.classList.add('reveal'));

new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 50);
    }
  });
}, { threshold: 0.08 }).observe && null;

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => { entry.target.classList.add('visible'); }, i * 55);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== NAV =====
const navHeader = document.querySelector('.nav-header');
window.addEventListener('scroll', () => {
  navHeader.style.boxShadow = window.scrollY > 20
    ? '0 4px 30px rgba(0,0,0,0.5)'
    : 'none';
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const a = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (a) a.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sObs.observe(s));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ===== FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Sent!';
    btn.style.background = '#00995a';
    setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); }, 3000);
  });
}
=======
// script.js

document.addEventListener('DOMContentLoaded', function() {
    fetch('logos.json')
        .then(response => response.json())
        .then(logos => {
            // Render logos for skills section
            const skillsList = document.getElementById('skillsList');
            if (skillsList) {
                skillsList.querySelectorAll('[data-skill]').forEach(item => {
                    const skillName = item.dataset.skill;
                    const logoUrl = logos[skillName];
                    const placeholder = item.querySelector('.logo-placeholder');
                    if (logoUrl && placeholder) {
                        const img = document.createElement('img');
                        img.src = logoUrl;
                        img.alt = skillName;
                        img.classList.add('tech-logo');
                        placeholder.appendChild(img);
                    }
                });
            }

            // Render logos for social links in hero section using placeholders
            const socialLinksContainer = document.getElementById('socialLinks');
            if (socialLinksContainer) {
                const socialMedia = [
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sanjive-subramaniam/' },
                    { name: 'GitHub', url: 'https://github.com/sanjive05' },
                    { name: 'LeetCode', url: 'https://leetcode.com/u/sanjive05/' }
                ];

                socialLinksContainer.querySelectorAll('[data-skill]').forEach(item => {
                    const skillName = item.dataset.skill;
                    const logoUrl = logos[skillName];
                    const placeholder = item.querySelector('.logo-placeholder');

                    if (logoUrl && placeholder) {
                        const link = document.createElement('a');
                        link.href = socialMedia.find(sm => sm.name === skillName)?.url || '#';
                        link.target = '_blank';

                        const img = document.createElement('img');
                        img.src = logoUrl;
                        img.alt = skillName;
                        img.classList.add('social-icon');

                        link.appendChild(img);
                        placeholder.parentNode.replaceChild(link, placeholder);
                    }
                });
            }

            // Smooth scrolling for navigation links
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Basic form submission handling
            const contactForm = document.querySelector('#contact form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    alert('Your message has been sent! (This is a simulation)');
                    contactForm.reset();
                });
            }
        })
        .catch(error => {
            console.error('Error fetching logos:', error);
        });
});
>>>>>>> a3d3d1c2880dda1dfa9bf7bde3458ad8a2f6bc50
