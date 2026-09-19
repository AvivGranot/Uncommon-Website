/* ========================================
   READING LIST
   Loaded in <head> so the list is hidden before first paint.
   HeroAnimationController calls reveal() once the typewriter is done.
   If this file fails to load, the full list simply shows (no rl-js class).
   ======================================== */

(function () {
  document.documentElement.classList.add('rl-js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.ReadingList = {
    mount: function (root) {
      if (!root) return { reveal: function () {} };

      var toggle = root.querySelector('.rl-toggle');
      var total = root.querySelectorAll('.rl-item').length;
      var showAll = 'Show all ' + total + ' books';

      toggle.textContent = showAll;
      toggle.hidden = false;

      toggle.addEventListener('click', function () {
        var expanded = root.classList.toggle('is-expanded');
        toggle.setAttribute('aria-expanded', expanded);
        toggle.textContent = expanded ? 'Show fewer' : showAll;

        // After collapsing, bring the list back into view if it scrolled away
        var top = root.getBoundingClientRect().top;
        if (!expanded && top < 0) {
          var header = document.querySelector('.site-header');
          window.scrollTo({
            top: window.scrollY + top - (header ? header.offsetHeight : 0) - 16,
            behavior: reduceMotion ? 'auto' : 'smooth'
          });
        }
      });

      var revealed = false;
      return {
        reveal: function () {
          if (revealed) return;
          revealed = true;
          root.classList.add('is-visible');
        }
      };
    }
  };
})();
