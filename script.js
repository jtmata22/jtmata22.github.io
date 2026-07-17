const page = location.pathname.split('/').pop() || 'index.html';
const nav = document.querySelector('.nav');
if (nav) {
  const links = [['index.html', 'Home'], ['about.html', 'About Me'], ['projects.html', 'Projects'], ['travel.html', 'Travel'], ['reading-watching.html', 'Reading & Watching'], ['thoughts.html', 'Thoughts']];
  nav.innerHTML = links.map(([href, label]) => `<a class="${page === href ? 'active' : ''}" href="${href}">${label}</a>`).join('');
}
if (page === 'projects.html') {
  const projectGrid = document.querySelector('.grid');
  if (projectGrid) {
    projectGrid.insertAdjacentHTML('afterbegin', '<article class="card sage"><div class="project-visual visual-brand" aria-hidden="true"></div><div><span class="tag">Brand</span><h3>Beauty brand launch</h3><p>Launching a beautiful new beauty brand with thoughtful operations behind it.</p></div><div class="card-footer"><span>Details coming soon</span><span class="arrow">↗</span></div></article><article class="card lavender"><div class="project-visual visual-operations" aria-hidden="true"></div><div><span class="tag">Operations</span><h3>London Fashion Week</h3><p>Operations work supporting the pace, coordination, and moving parts of London Fashion Week.</p></div><div class="card-footer"><span>Details coming soon</span><span class="arrow">↗</span></div></article>');
    const visuals = ['visual-brand', 'visual-operations', 'visual-systems', 'visual-community', 'visual-brand', 'visual-operations'];
    projectGrid.querySelectorAll('.card').forEach((card, index) => {
      if (!card.querySelector('.project-visual')) card.insertAdjacentHTML('afterbegin', `<div class="project-visual ${visuals[index % visuals.length]}" aria-hidden="true"></div>`);
    });
  }
}
const projectRail = document.querySelector('.project-rail');
if (projectRail) {
  let timer;
  let paused = false;
  const cards = [...projectRail.querySelectorAll('.card')];
  let current = 0;
  const advance = () => {
    if (paused || cards.length < 2) return;
    current = (current + 1) % cards.length;
    projectRail.scrollTo({ left: cards[current].offsetLeft - projectRail.offsetLeft, behavior: 'smooth' });
  };
  const start = () => { clearInterval(timer); timer = setInterval(advance, 3200); };
  const pause = () => { paused = true; clearInterval(timer); };
  const resume = () => { paused = false; start(); };
  projectRail.addEventListener('mouseenter', pause);
  projectRail.addEventListener('mouseleave', resume);
  projectRail.addEventListener('focusin', pause);
  projectRail.addEventListener('focusout', resume);
  projectRail.addEventListener('touchstart', pause, { passive: true });
  projectRail.addEventListener('touchend', () => setTimeout(resume, 4500), { passive: true });
  start();
}
const revealItems = document.querySelectorAll('main section, .card, .list-item, .note');
revealItems.forEach((item, index) => {
  item.classList.add('scroll-reveal');
  item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
const menuButton = document.querySelector('.menu-button');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open);
  });
}
