// Client-side event clock. The site only rebuilds on push, so anything that
// depends on "now" (which meetup is next, countdowns) is decided here.
(function() {
  var TZ = document.body.getAttribute('data-timezone') || 'America/Denver';

  // Offset of TZ from UTC at instant `ts`, in ms.
  function tzOffset(ts) {
    var parts = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).formatToParts(new Date(ts)).forEach(function(p) { parts[p.type] = p.value; });
    return Date.UTC(+parts.year, parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second) - ts;
  }

  // "2026-11-05" + "18:00", wall-clock time in TZ -> epoch ms.
  function toEpoch(day, time) {
    var d = day.split('-').map(Number);
    var t = (time || '00:00').split(':').map(Number);
    var guess = Date.UTC(d[0], d[1] - 1, d[2], t[0], t[1]);
    var off = tzOffset(guess);
    var off2 = tzOffset(guess - off);
    return guess - off2;
  }

  var HOUR = 3600 * 1000;

  // Start and end of an element carrying data-event-day/-start/-end. Without a
  // start time the event spans the whole day; without an end it runs two hours.
  function eventWindow(el) {
    var day = el.getAttribute('data-event-day');
    var start = el.getAttribute('data-event-start');
    var end = el.getAttribute('data-event-end');
    if (!start) return { start: toEpoch(day), end: toEpoch(day) + 24 * HOUR };
    var s = toEpoch(day, start);
    return { start: s, end: end ? toEpoch(day, end) : s + 2 * HOUR };
  }

  // Next meetup card: show the first event that hasn't ended yet.
  var cards = document.querySelectorAll('.next-meetup-card[data-event-day]');
  if (cards.length) {
    var now = Date.now();
    var shown = null;
    cards.forEach(function(card) {
      var visible = !shown && eventWindow(card).end > now;
      card.hidden = !visible;
      if (visible) shown = card;
    });
    var tba = document.querySelector('.next-meetup-tba');
    if (tba) tba.hidden = !!shown;
  }

  // Today's date in TZ as "YYYY-MM-DD" (en-CA formats dates that way).
  function today() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
  }

  function countdownText(ms) {
    var mins = Math.floor(ms / 60000);
    var d = Math.floor(mins / 1440), h = Math.floor(mins % 1440 / 60), m = mins % 60;
    if (d > 0) return 'Starts in ' + d + 'd ' + h + 'h';
    if (h > 0) return 'Starts in ' + h + 'h ' + m + 'm';
    return 'Starts in ' + Math.max(m, 1) + ' min';
  }

  var countdowns = document.querySelectorAll('[data-countdown]');
  var banners = document.querySelectorAll('.event-banner');

  function tick() {
    var now = Date.now();

    countdowns.forEach(function(el) {
      var w = eventWindow(el.closest('[data-event-day]'));
      el.classList.toggle('is-live', now >= w.start && now < w.end);
      el.textContent = now < w.start ? countdownText(w.start - now)
        : now < w.end ? 'Happening now' : '';
    });

    // Banner on the day of a meetup, until it ends. Only the first match shows.
    var shownBanner = false;
    banners.forEach(function(el) {
      var w = eventWindow(el);
      var show = !shownBanner && el.getAttribute('data-event-day') === today() && now < w.end;
      el.hidden = !show;
      if (show) {
        shownBanner = true;
        var when = el.querySelector('.event-banner-when');
        when.textContent = when.getAttribute(now >= w.start ? 'data-live' : 'data-soon');
      }
    });
  }

  if (countdowns.length || banners.length) {
    tick();
    setInterval(tick, 30000);
  }
})();
