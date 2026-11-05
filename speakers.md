---
layout: default
title: Speakers
permalink: /speakers/
description: Everyone who has taken the stage at the Boulder AWS User Group.
---

{% comment %}
  Built from every post's `talks`. A speaker is matched by name across posts;
  the most recent appearance supplies title and company, and the first photo
  or LinkedIn link found anywhere is used. A steering committee headshot wins
  over talk photos, which are often tall AWS badge images.
{% endcomment %}

{% assign today = site.time | date: "%Y%m%d" | plus: 0 %}
{% assign names = "" | split: "" %}
{% for post in site.posts %}{% for talk in post.talks %}
  {% assign talk_names = talk.speakers | map: "name" %}
  {% assign names = names | concat: talk_names %}
{% endfor %}{% endfor %}
{% assign names = names | uniq %}

<h1>{{ page.title }}</h1>

<p class="speakers-intro">{{ names.size }} people have shared what they've built, broken, and learned on AWS with the Boulder community. Thank you!</p>

<ul class="speakers-grid">
  {% for name in names %}
  {% assign latest = nil %}{% assign photo = "" %}{% assign bio_link = "" %}
  {% for post in site.posts %}{% for talk in post.talks %}{% for s in talk.speakers %}
    {% if s.name == name %}
      {% unless latest %}{% assign latest = s %}{% endunless %}
      {% assign s_photo = s.photo | strip %}{% if photo == "" and s_photo != "" %}{% assign photo = s_photo %}{% endif %}
      {% assign s_bio = s.bio_link | strip %}{% if bio_link == "" and s_bio != "" %}{% assign bio_link = s_bio %}{% endif %}
    {% endif %}
  {% endfor %}{% endfor %}{% endfor %}
  {% assign committee = site.data.steering_committee | where: "name", name | first %}
  {% if committee.image %}{% assign photo = committee.image %}{% endif %}
  {% assign name_parts = name | split: " " %}
  <li class="speaker-card">
    {% if photo != "" %}
    <img class="speaker-photo" src="{{ photo | relative_url }}" alt="{{ name }}" loading="lazy">
    {% else %}
    <span class="speaker-photo speaker-initials" aria-hidden="true">{{ name_parts.first | slice: 0 }}{{ name_parts.last | slice: 0 }}</span>
    {% endif %}
    <h3 class="speaker-name">{{ name }}{% if bio_link != "" %} <a href="{{ bio_link }}" aria-label="{{ name }} on LinkedIn">{% include icon-linkedin.html %}</a>{% endif %}</h3>
    {% if latest.title or latest.company %}
    <p class="speaker-role">{{ latest.title }}{% if latest.title and latest.company %} &middot; {% endif %}{{ latest.company }}</p>
    {% endif %}
    <ul class="speaker-talks">
      {% for post in site.posts %}{% for talk in post.talks %}
        {% assign talk_names = talk.speakers | map: "name" %}
        {% if talk_names contains name %}
        {% assign post_day = post.date | date: "%Y%m%d" | plus: 0 %}
        <li>
          <a href="{{ post.url | relative_url }}">{{ talk.topic }}</a>
          <small>{% if post_day >= today %}<span class="speaker-upcoming">Upcoming</span> {% endif %}{{ post.date | date: "%b %Y" }}</small>
        </li>
        {% endif %}
      {% endfor %}{% endfor %}
    </ul>
  </li>
  {% endfor %}

  <li class="speaker-card speaker-card-cta">
    <span class="speaker-photo speaker-initials" aria-hidden="true">?</span>
    <h3 class="speaker-name">You?</h3>
    <p class="speaker-role">First-timers welcome. Five minutes or fifty.</p>
    <p><a class="speaker-cta-btn" href="/call-for-talks/">Submit a talk</a></p>
  </li>
</ul>

<style>
.speakers-intro {
  font-size: 1.1em;
}
.speakers-grid {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}
.speaker-card {
  padding: 22px 18px 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}
.speaker-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.12);
}
.speaker-photo {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 12px;
  display: block;
  border: 3px solid #FF9900;
}
.speaker-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #232F3E;
  color: #FF9900;
  font-size: 2.2em;
  font-weight: 700;
}
.speaker-name {
  margin: 0 0 4px;
  font-size: 1.1em;
}
.speaker-name svg {
  width: 18px;
  vertical-align: -3px;
}
.speaker-role {
  margin: 0 0 12px;
  font-size: 0.9em;
  color: #777;
}
.speaker-talks {
  list-style: none;
  padding: 12px 0 0;
  margin: 0;
  border-top: 1px solid #eee;
  text-align: left;
  font-size: 0.9em;
}
.speaker-talks li {
  margin-bottom: 8px;
}
.speaker-talks small {
  display: block;
  color: #999;
}
.speaker-upcoming {
  color: #c45500;
  font-weight: 700;
  text-transform: uppercase;
}
.speaker-card-cta {
  border: 2px dashed #FF9900;
  box-shadow: none;
  background: #fffaf2;
}
.speaker-cta-btn {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 8px;
  background: #FF9900;
  color: #232F3E;
  font-weight: 700;
}
</style>
