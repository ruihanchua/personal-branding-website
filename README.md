# Ray Chua — personal-branding landing page

A responsive landing page in Ray's muted green and beige, pairing bold Manrope headings with Playfair Display italic. The page follows one shared journey and introduces coaching/classes and hands-on support later in the page.

## See the design

![Desktop opening of Ray Chua's landing page](preview/desktop.png)

## Open the full page on your computer

1. Open `ray-landing-page.html` in this repository.
2. Use GitHub's **Download raw file** button to download it.
3. Double-click the downloaded HTML file to open it in your browser.

The single HTML file includes the styles and fonts, so it needs no installation or server.

### Edit photos and wording without uploading them to chat

For an editing version, download and open `landing-page-preview.html`. Ray’s selected waterfall and city-night photos are already included. Replace either photo and adjust its vertical framing with the sliders. Click **Edit page text**, then click headings, paragraphs or call-to-action wording to change them. Click **Save my page** and open the downloaded `ray-landing-page-personalised.html` to see the finished page without editor controls. Editing does not autosave; download before closing the tab. Changes remain local until the edited file is shared or hosted. Photos stay in your browser; there is no network upload, and the exported file embeds both images. HEIC photos should first be exported as JPG. This personalised file is local until you choose to host or share it.

Ray’s uploaded personalised HTML supplied the two source photographs, now extracted into `images/` and included in both portable downloads. The changed second photograph is the city-night portrait, not the earlier gallery candidate. GitHub shows HTML source in its file viewer; downloading and opening the file displays the website.

## Develop

Run from this checkout:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

Edit `index.html`, `styles.css`, and `fonts.css`. Fonts and their licences are under `fonts/`. Regenerate the standalone preview with `python3 scripts/build-preview.py` after updating the source. Deploy `index.html`, `styles.css`, `fonts.css`, `fonts/` and `images/` to a static web host, or host the standalone `ray-landing-page.html`.

## Current state

- Layout, shared signup navigation and FAQs checked at 1440, 768, 390 and 320 pixels.
- The name/email signup is explicitly marked as opening soon and disabled until a real email provider is connected. No email addresses are collected.
- Free training is not promised. The older hook-bank files are draft resources and are not linked from the landing page.
- This branch contains a draft website, not a public website deployment.
