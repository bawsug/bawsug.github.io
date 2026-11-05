---
layout: default
title: "Meetups and Talks"
canceled: false
---

{% assign today = site.time | date: "%Y%m%d" | plus: 0 %}

<h1>{{ page.title }}</h1>

{% capture upcoming_items %}
{% for post in site.posts reversed %}
  {% assign post_day = post.date | date: "%Y%m%d" | plus: 0 %}
  {% if post_day >= today %}{% include post-list-item.html post=post %}{% endif %}
{% endfor %}
{% endcapture %}

{% if upcoming_items contains "<li" %}
<h2>Upcoming</h2>
<ul class="post-list">
{{ upcoming_items }}
</ul>
{% endif %}

<h2>Past Meetups</h2>
<ul class="post-list">
{% for post in site.posts %}
  {% assign post_day = post.date | date: "%Y%m%d" | plus: 0 %}
  {% if post_day < today %}{% include post-list-item.html post=post %}{% endif %}
{% endfor %}
</ul>
