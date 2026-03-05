---
layout: default
title: Steering Committee
permalink: /steering-committee/
---

<h1>{{ page.title }}</h1>

---

<div id="carousel-container" style="position: relative; width: 100%; height: 420px; margin: 40px auto; perspective: 800px;">
  {% for member in site.data.steering_committee %}
  <div class="carousel-card" data-index="{{ forloop.index0 }}" data-website="{{ member.website }}" style="position: absolute; text-align: center; width: 180px;">
    <img src="{{ member.image }}" alt="{{ member.name }}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
    <h3 style="margin: 10px 0 5px;">{{ member.name }}</h3>
    <p style="margin: 0; font-size: 0.9em;">{{ member.title }}</p>
    <a href="{{ member.linkedin }}">LinkedIn</a>
  </div>
  {% endfor %}
</div>

<!-- Spotlight overlay -->
<div id="spotlight-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9998; cursor: pointer;">
</div>
<div id="spotlight-card" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; text-align: center; background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.4); cursor: default;">
  <img id="spotlight-img" src="" alt="" style="width: 200px; height: 200px; border-radius: 50%; object-fit: cover; box-shadow: 0 8px 30px rgba(0,0,0,0.3);">
  <h2 id="spotlight-name" style="margin: 15px 0 5px;"></h2>
  <p id="spotlight-title" style="margin: 0 0 10px; font-size: 1em; color: #666;"></p>
  <a id="spotlight-linkedin" href="" style="font-size: 1.1em;">LinkedIn Profile</a>
  <br>
  <a id="spotlight-website" href="" style="font-size: 1.1em; display: none;">Personal Site</a>
  <p style="margin-top: 20px; font-size: 0.8em; color: #999;">click anywhere to close</p>
</div>

<style>
  .carousel-card {
    cursor: pointer;
    transition: opacity 0.3s ease;
  }
  .carousel-card:hover img {
    box-shadow: 0 6px 25px rgba(0,0,0,0.35) !important;
  }
  #spotlight-card {
    animation: spotlightIn 0.3s ease;
  }
  @keyframes spotlightIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
</style>

<script>
(function() {
  const cards = document.querySelectorAll('.carousel-card');
  const container = document.getElementById('carousel-container');
  const overlay = document.getElementById('spotlight-overlay');
  const spotlightCard = document.getElementById('spotlight-card');
  const count = cards.length;
  let angle = 0;
  let speed = 0.003;
  let paused = false;
  let spotlighted = false;

  function getRadius() {
    return Math.min(container.offsetWidth * 0.35, 280);
  }

  function animate() {
    if (!paused && !spotlighted) {
      angle += speed;
    }

    const radius = getRadius();
    const centerX = container.offsetWidth / 2 - 90;
    const centerY = 140;

    cards.forEach((card, i) => {
      const theta = angle + (i * 2 * Math.PI / count);
      const x = centerX + radius * Math.cos(theta);
      const y = centerY + radius * Math.sin(theta) * 0.65;
      const scale = 0.75 + 0.25 * (Math.sin(theta) * 0.5 + 0.5);
      const zIndex = Math.round(100 + 50 * Math.sin(theta));
      const opacity = 0.6 + 0.4 * (Math.sin(theta) * 0.5 + 0.5);

      // 3D tilt based on position in orbit
      const rotateY = Math.cos(theta) * 25;  // tilt left/right
      const rotateX = -Math.sin(theta) * 8;  // subtle forward/back tilt

      card.style.left = x + 'px';
      card.style.top = y + 'px';
      card.style.zIndex = zIndex;
      card.style.transform = 'scale(' + scale + ') rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';
      card.style.opacity = opacity;
    });

    requestAnimationFrame(animate);
  }

  // Spotlight on click
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const name = card.querySelector('h3');
      const title = card.querySelector('p');
      const link = card.querySelector('a');

      document.getElementById('spotlight-img').src = img.src;
      document.getElementById('spotlight-img').alt = img.alt;
      document.getElementById('spotlight-name').textContent = name.textContent;
      document.getElementById('spotlight-title').textContent = title.textContent;
      document.getElementById('spotlight-linkedin').href = link.href;

      const websiteEl = document.getElementById('spotlight-website');
      const website = card.getAttribute('data-website');
      if (website && website !== '') {
        websiteEl.href = website;
        websiteEl.style.display = 'inline';
      } else {
        websiteEl.style.display = 'none';
      }

      overlay.style.display = 'block';
      spotlightCard.style.display = 'block';
      spotlighted = true;
    });
  });

  function closeSpotlight() {
    overlay.style.display = 'none';
    spotlightCard.style.display = 'none';
    spotlighted = false;
  }

  overlay.addEventListener('click', closeSpotlight);
  spotlightCard.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') closeSpotlight();
  });

  // Pause on hover
  container.addEventListener('mouseenter', () => { paused = true; });
  container.addEventListener('mouseleave', () => { paused = false; });

  animate();
})();
</script>
