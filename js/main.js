/* Shared invitation, navigation, accessible tabs, and final-content wiring. */
(() => {
  'use strict';
  const config = window.WEDDING_CONFIG || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = document.querySelector('#opening');
  const site = document.querySelector('#site-content');
  if (opening && !location.hash) {
    opening.hidden = false;
    site.inert = true;
    document.body.classList.add('opening-active');
    document.documentElement.classList.remove('opening-pending');
    const start = opening.querySelector('[data-press-start]');
    start.focus();
    start.addEventListener('click', () => {
      start.disabled = true;
      opening.classList.add('leaving');
      setTimeout(() => {
        opening.hidden = true;
        site.inert = false;
        document.body.classList.remove('opening-active');
        history.replaceState(null, '', '#home');
        const home = document.querySelector('#home');
        home.tabIndex = -1;
        home.focus({preventScroll:true});
        window.scrollTo(0, 0);
      }, reduced ? 0 : 650);
    });
  }

  const menu = document.querySelector('#mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  toggle?.addEventListener('click', () => {
    menu.showModal();
    toggle.setAttribute('aria-expanded','true');
    document.body.classList.add('modal-open');
  });
  menu?.querySelector('.menu-close').addEventListener('click', () => menu.close());
  menu?.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded','false');
    document.body.classList.remove('modal-open');
  });
  menu?.addEventListener('click', e => { if (e.target.closest('a')) menu.close(); });
  const navGroups = [...document.querySelectorAll('.desktop-nav details')];
  navGroups.forEach(group => group.addEventListener('toggle', () => {
    if(group.open) navGroups.forEach(other => { if(other !== group) other.open = false; });
  }));
  document.addEventListener('click', e => {
    if(!e.target.closest('.desktop-nav')) navGroups.forEach(group => { group.open = false; });
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') navGroups.forEach(group => {
      if(group.open) { group.open = false; group.querySelector('summary').focus(); }
    });
  });
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    if(a.getAttribute('href').split('#')[0] === current) a.setAttribute('aria-current','page');
  });

  const groups = [...document.querySelectorAll('[data-tabs]')];
  function select(group, id, focus = false) {
    group.querySelectorAll('a').forEach(tab => {
      const active = tab.hash === '#' + id;
      tab.setAttribute('aria-selected',String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.hash.slice(1)).hidden = !active;
      if(active && focus) tab.focus();
    });
  }
  groups.forEach(group => {
    group.setAttribute('role','tablist');
    const tabs = [...group.querySelectorAll('a')];
    tabs.forEach((tab, index) => {
      tab.setAttribute('role','tab');
      tab.setAttribute('aria-controls',tab.hash.slice(1));
      const panel = document.getElementById(tab.hash.slice(1));
      panel.setAttribute('role','tabpanel');
      panel.setAttribute('aria-labelledby',tab.id);
      panel.tabIndex = 0;
      tab.addEventListener('click', e => {
        e.preventDefault();
        select(group, tab.hash.slice(1));
        history.pushState(null,'',tab.hash);
      });
      tab.addEventListener('keydown', e => {
        let next;
        if(e.key === 'ArrowRight') next = (index+1)%tabs.length;
        if(e.key === 'ArrowLeft') next = (index+tabs.length-1)%tabs.length;
        if(e.key === 'Home') next = 0;
        if(e.key === 'End') next = tabs.length-1;
        if(next !== undefined) { e.preventDefault(); select(group,tabs[next].hash.slice(1),true); }
      });
    });
    select(group,tabs[0].hash.slice(1));
  });
  function revealHash() {
    const aliases = {'#party':'#entourage','#colors':'#guests'};
    const hash = aliases[location.hash] || location.hash;
    const target = document.getElementById(hash.slice(1));
    if(!target) return;
    let panel = target.closest('[data-panel]');
    while(panel) {
      const group = groups.find(g => g.dataset.tabs === panel.dataset.panel);
      if(group) select(group,panel.id);
      panel = panel.parentElement.closest('[data-panel]');
    }
    target.scrollIntoView({block:'start',behavior:'instant'});
  }
  if(location.hash) revealHash();
  window.addEventListener('hashchange',revealHash);
  window.addEventListener('popstate',revealHash);

  function safeUrl(value) {
    if(!value) return null;
    try { const url = new URL(value,location.href); return ['http:','https:','file:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  }
  window.weddingSafeUrl = safeUrl;
  const rsvp = document.querySelector('[data-rsvp-link]');
  const rsvpUrl = safeUrl(config.rsvpUrl);
  if(rsvp && rsvpUrl && /^https?:/.test(rsvpUrl)) {
    rsvp.href = rsvpUrl;
    rsvp.removeAttribute('aria-disabled');
    rsvp.removeAttribute('role');
    document.querySelector('[data-rsvp-status]').hidden = true;
  }
  document.querySelectorAll('[data-coordinator]').forEach(el => {
    if(config.coordinator) el.textContent = config.coordinator;
  });
  document.querySelectorAll('[data-map], [data-directions], [data-journey-directions]').forEach(link => {
    const key = link.dataset.map ? link.dataset.map+'Map' : link.dataset.directions ? link.dataset.directions+'Directions' : 'journeyDirections';
    if(safeUrl(config.links?.[key])) link.href = config.links[key];
  });
})();
