---
layout: default
title: "List of Meetups and Talks"
---


<ul class="list pa0">
<h1>{{ page.title }}</h1>



{% for post in site.posts %}
  <li class="mv2">
    <a href="{{ post.url | relative_url }}" class="db pv1 link blue hover-mid-gray">
      <time class="fr silver ttu">{{ post.date | date_to_string }} </time>
      {{ post.title }}
    </a>
  </li>
  {% endfor %}
</ul>