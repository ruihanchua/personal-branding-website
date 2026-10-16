# Ray Chua — personal-branding landing page

A responsive landing page in Ray's muted green and beige, pairing bold Manrope headings with Playfair Display italic. The page follows one shared journey and introduces coaching/classes and hands-on support later in the page.

## See the design

![Desktop opening of Ray Chua's landing page](preview/desktop.png)

## Open the full page on your computer

1. Open `landing-page-preview.html` in this repository.
2. Use GitHub's **Download raw file** button to download it.
3. Double-click the downloaded HTML file to open it in your browser.

The single HTML file includes the styles and fonts, so it needs no installation or server. GitHub shows HTML source in its file viewer; downloading and opening the file displays the website.

## Develop

Run from this checkout:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Edit `index.html`, `styles.css`, and `fonts.css`. Fonts and their licences are under `fonts/`. Regenerate `landing-page-preview.html` after updating the source. Serve the source files to deploy to a static web host.

## Current state

- Layout, shared signup navigation and FAQs checked at 1440, 768, 390 and 320 pixels.
- The name/email signup is explicitly marked as opening soon and disabled until a real email provider is connected. No email addresses are collected.
- Free training is not promised. The older hook-bank files are draft resources and are not linked from the landing page.
- This branch contains a draft website, not a public website deployment.
