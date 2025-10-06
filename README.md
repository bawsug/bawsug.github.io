# bawsug.github.io
Boulder AWS User Group Pages

## Creating Event Posts

### File Naming
`YYYY-MM-DD-Speaker-Topic.md` in `_posts/` directory

### Template Structure
```yaml
---
layout: post
title: "Speaker talks about Topic"
date: YYYY-MM-DD
speaker:
  name: "Full Name"
  photo: "/assets/img/hyperbadge_username.png"
  bio_link: "https://linkedin.com/in/profile/"
  company: "Company Name"
  title: "Job Title"
talk:
  topic: "Talk Topic"
  level: "Beginner|Intermediate|Advanced|All Levels"
  event_link: "https://www.meetup.com/boulder-aws-amazon-web-services/events/ID/"
tags: [aws, topic1, topic2]
---

Brief description of the talk content.

![](/assets/img/event_photo.jpg)
```

### Required Assets
- Speaker photo: `/assets/img/hyperbadge_username.png`
- Event photo: `/assets/img/descriptive_name.jpg`

### Key Points
- Date format: YYYY-MM-DD
- Speaker photos follow `hyperbadge_` prefix pattern
- Include meetup event link
- Keep description concise
- Use relevant AWS-focused tags
