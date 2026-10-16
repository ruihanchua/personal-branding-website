# Landing page direction

Confirmed by Ray: one-to-one coaching, teaching through online classes, and hands-off personal-branding support. Visual direction: beige and pastel green, inspired by Ken Tjandra and Creator College. Exact shades, typography, audience, service scope and biography still need refinement.

Ken Tjandra’s HTML content was accessible on the second inspection; browser inspection failed certificate verification. No TLS verification was bypassed. Creator College was blocked by network policy; its domains were added to the configuration draft while preserving existing domains. Do not claim visual replication of either reference.

Superseded prototype offer: 50 free content hooks. See LANDING-PAGE-STRATEGY.md for the revised two-route funnel proposal. The hook bank and PDF are original draft content for Ray to review. They are hooks, not a course; future viral-format breakdowns can be a separate resource. No invented metrics, testimonials, or client claims are included.

The current download works without collecting email addresses. Recommended next step: connect a Kit signup form and email delivery, with suitable consent wording. Ray has no email-list service yet. Do not show a fake successful signup or collect addresses without a real integration. Hosting, domain setup, and email delivery are not configured.

## Development

No packages or build step required. Use the existing isolated checkout; do not create a worktree unless requested. From `/workspace/personal-branding-website`, run `python3 -m http.server 3000 --bind 0.0.0.0`. Edit `index.html` and `styles.css`. `50-content-hooks.html` is the editable resource source and `50-content-hooks.pdf` its downloadable printable version. Regenerate the PDF after changing its source. Deploy all four public files when ready.

## Updated visual references

Ray supplied a muted green and warm beige image. Current matching palette: green #4e8e75 and beige #f4f1ea. Playfair Display 600 italic accents are paired with Manrope 800 headings, a clean open-source substitute for the suggested Clarify / Earnest style. Those exact commercial font files were not supplied. Fonts are self-hosted under fonts/ with OFL licences, distributed by Fontsource 5.3.0. Deploy fonts.css and fonts/ alongside the page and resource files. The PDF was regenerated with the new fonts and palette.

## Strategy review

Ray prioritised the landing page and business offer over the PDF. LANDING-PAGE-STRATEGY.md records inspected competitor offers, research limits, audience segmentation by learning versus delegation, recommended offer hypotheses, section purposes, measurement and outstanding implementation requirements. Do not treat the existing PDF-led prototype as an approved funnel.

## Shared-journey landing page implementation

Ray requested a single shared journey and a name/email form, with no committed free-training offer. The landing page now follows: shared outcome → recognisable problems → branding approach → Ray introduction → coaching/classes and hands-on support → FAQs → shared signup. All main calls to action reach the same form. The prototype hook/PDF offer is removed from the page. Fonts and image-inspired palette remain. The signup is explicitly opening soon, with disabled fields/button and an Instagram alternative, until a real provider is connected. No submitted email addresses are stored, transmitted or placed in URL queries. Mobile/desktop layout, section anchors, labelled inputs, FAQ interaction and pending integration state have been checked in Chromium. This is a draft, not a live lead-collection website.

## Photo selection and local preview

Ray agreed to use the photos already shown in chat. Selected direction: smiling waterfall portrait in the hero; gallery portrait beside Meet Ray. Other travel photos remain optional. The inline chat images have not been exposed as source assets to this executor; no downloadable attachment IDs were supplied and no originals exist under /workspace or /tmp. Do not claim the real photos are already embedded or replace them with generated likenesses.

The standalone preview now includes local file selectors and vertical focal sliders, plus export of a self-contained HTML file with embedded photos and no editor UI. Selection does not upload files or store them remotely. Source index.html retains its illustrated fallbacks until photos are supplied. Build using scripts/build-preview.py; preview-specific code is scripts/preview-photos.js. Browser checks used existing screenshot files as test fixtures only, verified selection, focal adjustment, mobile layout, and export. The user's personalised export is not automatically synced to GitHub or a public website.

## Uploaded personalised page and experience update

Ray uploaded an exported HTML page containing the actual waterfall portrait and a changed city-night portrait. Parsed only the image attributes/data to recover original JPEG bytes; attached HTML scripts were not executed or adopted. Both original images and object-position settings are now integrated into index.html, the clean standalone ray-landing-page.html and editable landing-page-preview.html. Alt text matches the changed city-night image.

User-confirmed biography: freelance editor since 17; began helping with content at 18; travelled to Shanghai. No dates, paid client results, employment in Shanghai or audience metrics were inferred. The supplied CRO notes were treated as reference material. Their example view counts, testimonials and consultation CTA were not adopted. Improvements include an explicit personal-branding headline, clearer support options, one repeated Get updates action and a labelled illustrative content example.

The editable preview now supports local rich-text editing of headings, copy, lists and CTAs, with navigation paused while editing. Plain-text paste avoids importing arbitrary pasted HTML. Export removes editing controls, script, contenteditable attributes and editing-mode class while keeping wording, images and focal positions. These edits are local, not automatically synced to GitHub. No email-provider integration is implied.

## First complete copy draft

Ray requested a full content draft while retaining local text editing, and plans to supply additional experience notes. The first draft now leads with turning what the visitor knows into a personal brand, describes specific content frustrations, explains the approach through an illustrative example, tells the confirmed age-17/18 story, presents learning and execution as support choices, answers fit/commitment questions and repeats Get updates as the primary action. The Shanghai mention remains a personal detail rather than a credential. No performance figures, testimonials, client names, packages, dates or prices have been invented. The current signup is still a proposed interest list, disabled until email delivery is configured. Additional experience notes should inform the next biography/proof revision.
