# bawsug.github.io
Boulder AWS User Group Pages

## Creating Event Posts

One post per meetup. A meetup can hold any number of talks, and a talk can have
any number of speakers.

### File Naming
`YYYY-MM-DD-Topic.md` in `_posts/` directory

### Template Structure
```yaml
---
layout: post
title: "Meetup or Talk Title"
date: YYYY-MM-DD
canceled: false
event_link: "https://www.meetup.com/boulderawsusergroup/events/ID/"
talks:
  - topic: "Talk Topic"
    level: "Beginner|Intermediate|Advanced|All Levels"
    speakers:
      - name: "Full Name"
        company: "Company Name"
        title: "Job Title"
        photo: "/assets/img/hyperbadge_username.png"
        bio_link: "https://linkedin.com/in/profile/"
      - name: "Co-Presenter Name"
        company: "Company Name"
        title: "Job Title"
  - topic: "Second Talk of the Night"
    level: "Intermediate"
    speakers:
      - name: "Another Speaker"
        company: "Company Name"
        title: "Job Title"
        photo: "/assets/img/AnotherSpeaker.jpeg"
        bio_link: "https://linkedin.com/in/profile/"
tags: [aws, topic1, topic2]
---

Brief description of the meetup.

![](/assets/img/event_photo.jpg)
```

The layout renders the speaker lineup automatically from `talks` — don't
hand-write a speaker list in the body.

### Optional Assets
- Speaker photo: `/assets/img/hyperbadge_username.png` or `/assets/img/FirstLast.jpeg`
- Event photo: `/assets/img/descriptive_name.jpg`

### Key Points
- Date format: YYYY-MM-DD
- `event_link` belongs to the meetup, so it lives at the top level, not inside a talk
- Every field except `topic` and `speakers[].name` is optional — omit `photo`
  entirely when a speaker has no headshot rather than leaving it empty
- AWS speaker photos follow the `hyperbadge_` prefix pattern
- Keep descriptions concise
- Use relevant AWS-focused tags

### Photo Galleries
Add a `gallery` list of `{src, alt}` entries to the front matter and render it
with `{% include photo-carousel.html images=page.gallery id="my-carousel" %}`.
