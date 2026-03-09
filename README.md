# Testimonial Widget

A lightweight, embeddable testimonial carousel you can drop onto any website. Shows rotating customer reviews with star ratings, photos, and names. No frameworks, no dependencies — just one JS and one CSS file.

## Features

- Auto-rotating testimonials with smooth fade transitions
- Star ratings (1-5)
- Customer photo or auto-generated initials avatar
- Fully responsive — works on mobile and desktop
- Configure via data attributes or a JSON array
- Pause on hover
- Navigation dots to jump between testimonials
- Looks good out of the box, easy to restyle

## Quick Start

Add the CSS and JS to your page:

```html
<link rel="stylesheet" href="testimonial-widget.css">
<script src="testimonial-widget.js"></script>
```

Then drop in the widget container with your testimonials as data attributes:

```html
<div id="testimonials"
     data-testimonials='[
       {"name":"Sarah M.","text":"Brilliant service, had our chatbot up in two days.","rating":5,"company":"Chester Bakery"},
       {"name":"James T.","text":"Finally, automation that actually works.","rating":5,"photo":"https://example.com/james.jpg"},
       {"name":"Priya K.","text":"Saved us hours every week. Wish we did this sooner.","rating":4,"company":"NK Design"}
     ]'
     data-interval="5000"
     data-auto-rotate="true">
</div>

<script>
  TestimonialWidget.init('#testimonials');
</script>
```

## Configuration Options

| Attribute | Default | Description |
|-----------|---------|-------------|
| `data-testimonials` | `[]` | JSON array of testimonial objects |
| `data-interval` | `5000` | Time between rotations in ms |
| `data-auto-rotate` | `true` | Auto-rotate through testimonials |

Each testimonial object:

```json
{
  "name": "Customer Name",
  "text": "What they said about you.",
  "rating": 5,
  "photo": "https://example.com/photo.jpg",
  "company": "Their Company"
}
```

`photo` is optional — if missing, the widget shows the person's initials in a coloured circle.

## Install via npm

```bash
npm install @hand-on-web/testimonial-widget
```

## Demo

Open `index.html` to see the widget in action with sample testimonials.

## About Hand On Web
We build AI chatbots, voice agents, and automation tools for businesses.
- 🌐 [handonweb.com](https://www.handonweb.com)
- 📧 outreach@handonweb.com
- 📍 Chester, UK

## Licence
MIT
