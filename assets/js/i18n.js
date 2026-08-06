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
