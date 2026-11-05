---
layout: default
title: "Meetups and Talks"
canceled: false
---

{% assign today = site.time | date: "%Y%m%d" | plus: 0 %}
{% assign upcoming = "" | split: "" %}
{% for post in site.posts reversed %}
  {% assign post_day = post.date | date: "%Y%m%d" | plus: 0 %}
  {% unless post.canceled %}{% if post_day >= today %}
    {% assign match = site.posts | where: "url", post.url %}
    {% assign upcoming = upcoming | concat: match %}
  {% endif %}{% endunless %}
{% endfor %}

{% include next-meetup.html events=upcoming %}

{% include stats-strip.html %}

<h1>{{ page.title }}</h1>

{% if upcoming.size > 1 %}
<h2>Also Coming Up</h2>
<ul class="post-list">
{% for post in upcoming offset: 1 %}{% include post-list-item.html post=post %}{% endfor %}
</ul>
{% endif %}

<h2>Past Meetups</h2>
<ul class="post-list">
{% for post in site.posts %}
  {% assign post_day = post.date | date: "%Y%m%d" | plus: 0 %}
  {% if post_day < today or post.canceled %}{% include post-list-item.html post=post %}{% endif %}
{% endfor %}
</ul>
