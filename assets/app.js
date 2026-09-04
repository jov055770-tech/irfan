const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuButton && mainNav) {
  menuButton.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      mainNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

let activePlayer = null;

function videoEmbed(videoUrl) {
  const url = new URL(videoUrl, window.location.href);

  if (url.hostname.includes('youtu.be') || url.hostname.includes('youtube.com')) {
    let videoId = '';
    if (url.hostname.includes('youtu.be')) videoId = url.pathname.split('/').filter(Boolean)[0] || '';
    if (!videoId && url.pathname.includes('/shorts/')) videoId = url.pathname.split('/shorts/')[1]?.split('/')[0] || '';
    if (!videoId && url.pathname.includes('/embed/')) videoId = url.pathname.split('/embed/')[1]?.split('/')[0] || '';
    if (!videoId) videoId = url.searchParams.get('v') || '';
    if (!videoId) return null;
    return {
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&playsinline=1&rel=0&enablejsapi=1`,
      title: 'YouTube video player'
    };
  }

  if (url.hostname.includes('instagram.com')) {
    const parts = url.pathname.split('/').filter(Boolean);
    const postIndex = parts.findIndex((part) => part === 'p' || part === 'reel');
    const postId = postIndex >= 0 ? parts[postIndex + 1] : '';
    if (!postId) return null;
    return {
      src: `https://www.instagram.com/p/${encodeURIComponent(postId)}/embed/?autoplay=1`,
      title: 'Instagram video player'
    };
  }

  return null;
}

function stopActiveVideo() {
  if (!activePlayer) return;
  const { item, host, markup, role, tabIndex } = activePlayer;
  host.innerHTML = markup;
  host.classList.remove('player-active');
  item.classList.remove('playing');
  if (role === null) item.removeAttribute('role'); else item.setAttribute('role', role);
  if (tabIndex === null) item.removeAttribute('tabindex'); else item.setAttribute('tabindex', tabIndex);
  activePlayer = null;
}

function playVideo(item) {
  if (activePlayer?.item === item) {
    stopActiveVideo();
    return;
  }

  const embed = videoEmbed(item.dataset.videoUrl || '');
  if (!embed) return;
  stopActiveVideo();

  const host = item.matches('.featured-media') ? item : item.querySelector('.thumb');
  if (!host) return;

  activePlayer = {
    item,
    host,
    markup: host.innerHTML,
    role: item.getAttribute('role'),
    tabIndex: item.getAttribute('tabindex')
  };

  item.classList.add('playing');
  item.removeAttribute('role');
  item.removeAttribute('tabindex');
  host.classList.add('player-active');
  host.innerHTML = `
    <iframe src="${embed.src}" title="${embed.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
    <button class="player-close" type="button" data-close-player aria-label="Stop video">×</button>`;
}

document.addEventListener('click', (event) => {
  const closeButton = event.target.closest('[data-close-player]');
  if (closeButton) {
    event.preventDefault();
    event.stopPropagation();
    stopActiveVideo();
    return;
  }

  const featuredButton = event.target.closest('[data-play-featured]');
  if (featuredButton) {
    const featured = document.querySelector('.featured-media.inline-video');
    if (featured) playVideo(featured);
    return;
  }

  const item = event.target.closest('.inline-video');
  if (!item || event.target.closest('iframe')) return;
  event.preventDefault();
  playVideo(item);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    stopActiveVideo();
    return;
  }
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const item = event.target.closest('.inline-video');
  if (!item) return;
  event.preventDefault();
  playVideo(item);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 5, 4) * 65}ms`;
  observer.observe(item);
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -58% 0px' });
  sections.forEach((section) => navObserver.observe(section));
}
