// HEADER SCROLL
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

// MOBILE MENU
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ACTIVE SECTION LINK
const navLinks = document.querySelectorAll('.nav-menu a[data-nav]');
const sections = Array.from(navLinks)
  .map(link => document.getElementById(link.dataset.nav))
  .filter(Boolean);

const setActiveLink = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.nav === id);
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    setActiveLink(entry.target.id);
  });
}, {
  rootMargin: '-45% 0px -45% 0px',
  threshold: 0
});

sections.forEach(section => observer.observe(section));

// CLOSE MOBILE MENU ON LINK CLICK
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});


