(() => {
  'use strict';
  const config = window.WEDDING_CONFIG || {};
  const safe = window.weddingSafeUrl;
  const videoContainer = document.querySelector('[data-video-container]');
  if(safe(config.saveTheDateVideo)) {
    const video = document.createElement('video');
    video.controls = true;
    video.preload = 'none';
    video.playsInline = true;
    video.src = config.saveTheDateVideo;
    if(safe(config.videoPoster)) video.poster = config.videoPoster;
    const play = videoContainer.querySelector('button');
    videoContainer.querySelector('p').remove();
    videoContainer.prepend(video);
    play.disabled = false;
    play.addEventListener('click', () => {
      video.play().then(() => { play.hidden = true; }).catch(() => {
        play.textContent = 'Try Playing Again';
      });
    });
  }
  const photos = (config.prenupPhotos || []).filter(photo => safe(photo.src));
  if(!photos.length) return;
  const slideshow = document.querySelector('[data-slideshow]');
  const main = document.querySelector('[data-slide-image]');
  const dialog = document.querySelector('[data-lightbox]');
  const large = document.querySelector('[data-lightbox-image]');
  const thumbs = document.querySelector('[data-thumbnails]');
  const progress = document.querySelector('[data-photo-progress]');
  let index = 0;
  let request = 0;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  let hovered = false;
  let touching = false;
  function schedule() {
    clearTimeout(timer);
    if(photos.length < 2 || motion.matches || document.hidden || hovered || touching || dialog.open || slideshow.contains(document.activeElement)) return;
    timer = setTimeout(() => show(index+1), 5000);
  }
  slideshow.addEventListener('pointerenter', e => { if(e.pointerType === 'mouse') { hovered = true; schedule(); } });
  slideshow.addEventListener('pointerleave', e => { if(e.pointerType === 'mouse') { hovered = false; schedule(); } });
  slideshow.addEventListener('pointerdown', () => { touching = true; schedule(); });
  window.addEventListener('pointerup', () => { touching = false; schedule(); });
  window.addEventListener('pointercancel', () => { touching = false; schedule(); });
  slideshow.addEventListener('focusin', schedule);
  slideshow.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', schedule);
  slideshow.hidden = false;
  document.querySelector('[data-gallery-empty]').hidden = true;
  progress.max = photos.length;
  photos.forEach((photo,i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label','View photograph '+(i+1));
    const img = new Image();
    img.src = photo.src;
    img.alt = '';
    img.loading = 'lazy';
    button.append(img);
    button.addEventListener('click', () => show(i));
    thumbs.append(button);
  });
  function show(next) {
    clearTimeout(timer);
    index = (next+photos.length)%photos.length;
    const photo = photos[index];
    const ticket = ++request;
    const loaded = new Image();
    loaded.onload = () => {
      if(ticket !== request) return;
      slideshow.querySelectorAll('.slide-outgoing').forEach(image => image.remove());
      if(main.hasAttribute('src') && !motion.matches) {
        const outgoing = main.cloneNode();
        outgoing.removeAttribute('data-slide-image');
        outgoing.alt = '';
        outgoing.className = 'slide-outgoing';
        main.before(outgoing);
        outgoing.animate([{opacity:1},{opacity:0}],{duration:700,fill:'forwards'}).finished.then(() => outgoing.remove());
        main.animate([{opacity:0},{opacity:1}],{duration:700});
      }
      main.src = photo.src;
      main.alt = photo.alt || 'Gica and Vho, pre-wedding photograph '+(index+1);
      large.src = main.src;
      large.alt = main.alt;
      schedule();
    };
    loaded.onerror = () => {
      if(ticket !== request) return;
      main.removeAttribute('src');
      main.alt = 'This photograph is temporarily unavailable. Please try the next one.';
      large.removeAttribute('src');
      large.alt = main.alt;
      schedule();
    };
    loaded.src = photo.src;
    document.querySelector('[data-photo-counter]').textContent = String(index+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');
    progress.value = index+1;
    [...thumbs.children].forEach((button,i) => button.setAttribute('aria-pressed',String(i === index)));
    const selected = thumbs.children[index];
    thumbs.scrollTo({left:selected.offsetLeft-thumbs.offsetLeft-thumbs.clientWidth/2+selected.clientWidth/2,behavior:motion.matches ? 'instant' : 'smooth'});
  }
  document.querySelectorAll('[data-prev], [data-lightbox-prev]').forEach(button => button.addEventListener('click',() => show(index-1)));
  document.querySelectorAll('[data-next], [data-lightbox-next]').forEach(button => button.addEventListener('click',() => show(index+1)));
  document.querySelector('[data-enlarge]').addEventListener('click', () => {
    dialog.showModal();
    schedule();
    document.body.classList.add('modal-open');
  });
  document.querySelector('[data-lightbox-close]').addEventListener('click',() => dialog.close());
  dialog.addEventListener('close',() => { document.body.classList.remove('modal-open'); schedule(); });
  [slideshow,dialog].forEach(surface => {
    surface.addEventListener('keydown',e => {
      if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); show(index+(e.key === 'ArrowLeft' ? -1 : 1));
      }
    });
    let start = null;
    surface.addEventListener('touchstart',e => { start = {x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}; },{passive:true});
    surface.addEventListener('touchend',e => {
      if(!start || e.target.closest('[data-thumbnails]')) return;
      const dx = e.changedTouches[0].clientX-start.x;
      const dy = e.changedTouches[0].clientY-start.y;
      if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)) show(index+(dx<0 ? 1 : -1));
      start = null;
    },{passive:true});
  });
  show(0);
})();
