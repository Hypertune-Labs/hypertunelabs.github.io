# Hypertune Labs Landing Page

A minimalistic, single-page landing page with a quiet, confident aesthetic.

## Features

- Full-viewport hero section (100vh, no scrolling)
- Centered, typographically-focused content
- Smooth email input reveal animation
- Responsive design for desktop and mobile
- Respects `prefers-reduced-motion` accessibility setting
- Dark, minimal color palette

## Setup

1. Open `index.html` in a web browser, or
2. Serve via a local web server (recommended for development)

### Local Development Server

Using Python:
```bash
python -m http.server 8000
```

Using Node.js (http-server):
```bash
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Adding a Background Video

To add a background video, update the `.background-container` in `index.html`:

```html
<div class="background-container">
    <video autoplay muted loop playsinline class="background-video">
        <source src="video/nightsky.mp4" type="video/mp4">
    </video>
    <div class="background-overlay"></div>
</div>
```

And add this CSS to `styles.css`:

```css
.background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
    z-index: 0;
}
```

## Email Setup

The contact form currently uses a `mailto:` fallback that opens the user's email client. For a seamless experience, set up EmailJS:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{to_email}}` - recipient email (james@hypertunelabs.com)
   - `{{from_email}}` - sender's email
   - `{{message}}` - the message content
   - `{{reply_to}}` - reply-to address
4. Get your Service ID, Template ID, and Public Key
5. Update `script.js` with your credentials (lines 121-123)

**Alternative**: Use Formspree or another form service by modifying the `sendEmail()` function in `script.js`.

## Customization

- **Colors**: Edit CSS variables in `:root` in `styles.css`
- **Typography**: Change the Google Fonts import in `index.html`
- **Content**: Update the headline and subheadline text in `index.html`
- **Font Weights**: Headline uses Inter 800 (ExtraBold), subheadline uses Inter 300 (Light)

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with CSS Grid and Flexbox support.
