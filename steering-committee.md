---
layout: default
title: Steering Committee
permalink: /steering-committee/
---

<h1>{{ page.title }}</h1>

---

<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
{% for member in site.data.steering_committee %}
  <div style="text-align: center; width: 180px;">
    <img src="{{ member.image }}" alt="{{ member.name }}" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover;">
    <h3 style="margin: 10px 0 5px;">{{ member.name }}</h3>
    <p style="margin: 0; font-size: 0.9em;">{{ member.title }}</p>
    <a href="{{ member.linkedin }}">LinkedIn</a>
  </div>
{% endfor %}
</div>
