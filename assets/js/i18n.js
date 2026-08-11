(function () {
  var STORAGE_KEY = 'tomos-lang';

  function resolve(path, dict) {
    return path.split('.').reduce(function (o, k) {
      return (o && o[k] !== undefined) ? o[k] : null;
    }, dict);
  }

  function getLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
    return 'fr';
  }

  function applyLang(lang) {
    var dict = window.I18N && window.I18N[lang];
    if (!dict) return;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = resolve(el.getAttribute('data-i18n'), dict);
      if (val !== null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        var attr = parts[0], key = parts[1];
        var val = resolve(key, dict);
        if (val !== null) el.setAttribute(attr, val);
      });
    });

    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  window.setLang = applyLang;

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(getLang());
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.dataset.lang); });
    });

    var navEl = document.querySelector('nav');
    if (navEl) {
      var toggleNavBg = function () {
        navEl.classList.toggle('scrolled', window.scrollY > 20);
      };
      toggleNavBg();
      window.addEventListener('scroll', toggleNavBg, { passive: true });
    }

    var heroBg = document.querySelector('.hero-bg-parallax');
    var heroSectionEl = document.querySelector('.hero-section');
    if (heroBg) {
      var sizeHeroBg = function () {
        var minHeight = window.innerHeight * 0.5;
        var heroHeight = heroSectionEl ? heroSectionEl.offsetHeight : 0;
        heroBg.style.height = Math.max(heroHeight, minHeight) + 'px';
      };
      var moveHeroBg = function () {
        heroBg.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
      };
      sizeHeroBg();
      moveHeroBg();
      window.addEventListener('load', sizeHeroBg);
      window.addEventListener('resize', sizeHeroBg);
      window.addEventListener('scroll', moveHeroBg, { passive: true });
    }

    document.querySelectorAll('.feature-tour').forEach(function (tour) {
      var tabs = tour.querySelectorAll('.feature-tab');
      var textPanels = tour.querySelectorAll('.viewer-panel-text');
      var visualPanels = tour.querySelectorAll('.viewer-panel-visual');
      var tabsRow = tour.querySelector('.feature-tabs');
      var leftArrow = tour.querySelector('.tab-arrow-left');
      var rightArrow = tour.querySelector('.tab-arrow-right');

      var activate = function (index) {
        tabs.forEach(function (t, i) { t.classList.toggle('active', i === index); });
        textPanels.forEach(function (p, i) { p.classList.toggle('active', i === index); });
        visualPanels.forEach(function (p, i) { p.classList.toggle('active', i === index); });
        tour.classList.toggle('is-overview', index === 0);
      };

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () {
          activate(i);
          tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        });
      });

      var initialIndex = 0;
      textPanels.forEach(function (p, i) { if (p.classList.contains('active')) initialIndex = i; });
      tour.classList.toggle('is-overview', initialIndex === 0);

      if (leftArrow) leftArrow.addEventListener('click', function () { tabsRow.scrollBy({ left: -240, behavior: 'smooth' }); });
      if (rightArrow) rightArrow.addEventListener('click', function () { tabsRow.scrollBy({ left: 240, behavior: 'smooth' }); });
    });

    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-question');
      var a = item.querySelector('.faq-answer');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        item.parentElement.querySelectorAll('.faq-item.open').forEach(function (o) {
          if (o !== item) { o.classList.remove('open'); o.querySelector('.faq-answer').style.maxHeight = null; }
        });
        item.classList.toggle('open', !isOpen);
        a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
      });
    });
  });
})();
