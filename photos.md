---
layout: default
title: Photo Wall
permalink: /photos/
description: Photos from Boulder AWS User Group meetups.
---

{% comment %}
  Every post's `gallery`, newest event first. Posts without a gallery
  contribute their share `image` instead, so older meetups still appear
  (skipping the site logo, which _config.yml sets as every post's default).
{% endcomment %}

<h1>{{ page.title }}</h1>

<p>Snapshots from our meetups. Got photos from an event? Share them in <a href="https://join.slack.com/t/boulderaws/shared_invite/zt-3e1fgu85d-NbmWg5w4BKF03tGJiyrTbQ">Slack</a> and we'll add them.</p>

<div class="photo-wall" id="photo-wall">
  {% for post in site.posts %}
    {% if post.gallery %}
      {% for img in post.gallery %}
      <figure class="photo-wall-item">
        <a href="{{ img.src | relative_url }}" data-event="{{ post.title | escape }}" data-event-url="{{ post.url | relative_url }}">
          <img src="{{ img.src | relative_url }}" alt="{{ img.alt | default: post.title | escape }}" loading="lazy" decoding="async">
        </a>
        <figcaption>{{ post.date | date: "%b %Y" }}</figcaption>
      </figure>
      {% endfor %}
    {% elsif post.image and post.image != site.logo %}
      <figure class="photo-wall-item">
        <a href="{{ post.image | relative_url }}" data-event="{{ post.title | escape }}" data-event-url="{{ post.url | relative_url }}">
          <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }}" loading="lazy" decoding="async">
        </a>
        <figcaption>{{ post.date | date: "%b %Y" }}</figcaption>
      </figure>
    {% endif %}
  {% endfor %}
</div>

<div class="photo-lightbox" id="photo-lightbox" hidden>
  <button class="photo-lightbox-close" aria-label="Close">&times;</button>
  <button class="photo-lightbox-nav photo-lightbox-prev" aria-label="Previous photo">&lsaquo;</button>
  <figure>
    <img src="" alt="">
    <figcaption><span class="photo-lightbox-alt"></span> <a class="photo-lightbox-event" href=""></a></figcaption>
  </figure>
  <button class="photo-lightbox-nav photo-lightbox-next" aria-label="Next photo">&rsaquo;</button>
</div>

<style>
.photo-wall {
  columns: 2 200px;
  column-gap: 12px;
}
.photo-wall-item {
  position: relative;
  margin: 0 0 12px;
  break-inside: avoid;
  border-radius: 10px;
  overflow: hidden;
  background: #111;
}
.photo-wall-item img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.photo-wall-item a:hover img,
.photo-wall-item a:focus img {
  transform: scale(1.04);
  opacity: 0.85;
}
.photo-wall-item figcaption {
  position: absolute;
  left: 8px;
  bottom: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(35,47,62,0.8);
  color: #fff;
  font-size: 0.75em;
  pointer-events: none;
}
.photo-lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10,14,20,0.94);
}
.photo-lightbox[hidden] {
  display: none;
}
.photo-lightbox figure {
  margin: 0;
  max-width: 90vw;
  text-align: center;
}
.photo-lightbox img {
  max-width: 90vw;
  max-height: 82vh;
  border-radius: 6px;
}
.photo-lightbox figcaption {
  margin-top: 10px;
  color: #ccc;
}
.photo-lightbox-event {
  color: #FF9900;
  font-weight: 700;
}
.photo-lightbox button {
  position: absolute;
  background: rgba(255,255,255,0.12);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}
.photo-lightbox button:hover {
  background: rgba(255,255,255,0.25);
}
.photo-lightbox-close { top: 20px; right: 20px; }
.photo-lightbox-prev { left: 20px; top: 50%; transform: translateY(-50%); }
.photo-lightbox-next { right: 20px; top: 50%; transform: translateY(-50%); }
</style>

<script>
(function() {
  var links = document.querySelectorAll('#photo-wall a');
  var box = document.getElementById('photo-lightbox');
  var img = box.querySelector('img');
  var alt = box.querySelector('.photo-lightbox-alt');
  var ev = box.querySelector('.photo-lightbox-event');
  var idx = 0;

  function show(n) {
    idx = (n + links.length) % links.length;
    var a = links[idx];
    var thumb = a.querySelector('img');
    img.src = a.getAttribute('href');
    img.alt = thumb.alt;
    alt.textContent = thumb.alt + ' —';
    ev.textContent = a.getAttribute('data-event');
    ev.href = a.getAttribute('data-event-url');
  }

  function open(n) {
    show(n);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    box.querySelector('.photo-lightbox-close').focus();
  }

  function close() {
    box.hidden = true;
    document.body.style.overflow = '';
    links[idx].focus();
  }

  links.forEach(function(a, i) {
    a.addEventListener('click', function(e) { e.preventDefault(); open(i); });
  });
  box.querySelector('.photo-lightbox-close').onclick = close;
  box.querySelector('.photo-lightbox-prev').onclick = function() { show(idx - 1); };
  box.querySelector('.photo-lightbox-next').onclick = function() { show(idx + 1); };
  box.addEventListener('click', function(e) { if (e.target === box) close(); });

  document.addEventListener('keydown', function(e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  // Swipe support
  var startX;
  box.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, {passive: true});
  box.addEventListener('touchend', function(e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) show(idx + (diff > 0 ? 1 : -1));
  });
})();
</script>
