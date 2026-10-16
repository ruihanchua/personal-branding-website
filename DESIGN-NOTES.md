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

## Anonymised experience and provenance

Ray reported work for six client brands through a marketing agency: mental wellness/therapy app, health-service provider (exact discipline uncertain), Pilates, tuition, community/events and soap. Public copy groups these broadly as wellness, fitness, education, events and consumer products and explicitly attributes the experience to agency projects. Do not name brands, the agency, or individuals, and do not call these direct personal-branding clients. Exact personal duties are pending clarification; currently only video editing is claimed for agency projects. Travel-agency work is described generally as social-media support. Shanghai was a five-month stay, presented as biography, without inferring that client work took place there. No growth claims, testimonials, case studies or full-strategy ownership are implied. Named leads/past contacts are intentionally omitted.

## Application-first and animation update

Ray chose an application/questionnaire approach because calls are not their preferred initial sales step, and requested Typeform. All main CTAs now say Apply to work with me and lead to the same application section. The proposed follow-up starts by email; no call is required to apply. TYPEFORM-QUESTIONS.md includes the draft welcome, questions and post-submission text for creating a real form in Ray's own account. No actual Typeform link has been provided. The on-page prototype is explicitly marked as not submitting; it validates goals, support preference, optional profile link, challenges, timing, name, email and contact consent, and allows safe local review/copying. It uses no backend, network submission or persistent storage.

The preview editor accepts a public HTTPS Typeform URL with a /to/FORMID path and embeds the real form only once supplied; exports retain that URL and the runtime. Applicant answers, review summaries, editing attributes and controls are cleared on export. The source webpage uses site.js; both offline builds inline it. Real Typeform delivery, notifications and privacy settings remain unconfigured/unverified.

Reference inspection: Ken's served HTML includes floating decorative elements with animation durations/delays. Jonathan's includes layered opacity/blur/translate text entrances and transition classes. ViralVista and Content Academy contain animation/transition declarations; their precise runtime effects were not exhaustively observed. Blink Empire/Viral Hoarse were named but no exact URLs were supplied; do not claim to have inspected them. Adaptation here uses progressive section reveals, short hero entrances, gentle hover photo zoom, arrow movement and a count-up to the user-confirmed six agency client brands. Reduced-motion preferences disable animation; essential content remains visible without JavaScript.

Browser validation: desktop/mobile layout, required-field/URL/email/consent checks, back-navigation persistence, safe summary rendering, no network submission from the local preview, reduced motion, final counter value, edited copy/photos in export, removal of applicant answers, rejected non-Typeform URLs and retained Typeform connection. Typeform content was locally mocked in integration checks; real submissions were not tested.

## Submitted application, optional call and intro video

Ray asked whether leads can be captured independently of a booked call. The recommendation is a complete submitted Typeform application first, followed by an optional scheduling link on the form ending screen or follow-up email. This requires real Typeform response/notification settings; entering an email alone does not guarantee saved partial responses. The local preview now asks name/email/contact consent first, then goals/support, then current challenges, optional profile and optional timing. TYPEFORM-QUESTIONS.md explains each question's purpose and the required submitted/no-booking verification. No live calendar has been configured.

The opening is ready for a real YouTube/public Vimeo introduction using the preview editor's video-link control. Playback loads only after a deliberate click and opens in a native dialog with Escape/close cleanup and focus return. No video is configured by default, and no competitor recording is embedded or published. Both editable and clean offline exports preserve the chosen video URL, clear open player state and retain runtime behaviour. INTRO-VIDEO-SCRIPT.md provides an original 60–90-second spoken draft grounded in Ray's stated experience.

Reference inspection confirmed Creator College's signup VSL and ViralVista's YouTube embed; spoken scripts were not transcribed or verified. The new Viral Haus URL was proxy-blocked. Associated reference/media host additions were saved in the environment draft; this does not establish applied network access. No overall video-use percentage, causal conversion benefit or relationship between the other creators is treated as verified.

Browser checks passed for revised contact-first validation, safe review, optional timing/profile, desktop/mobile layout, supported/rejected video URLs, click-only loading, native modal/Escape/focus cleanup, persisted editor text/photos/video/Typeform configuration, and clearing applicant inputs on export. Remote media and Typeform were mocked in tests; real playback, submitted responses and calendar bookings remain unverified.

## Readability, motion variety and early-service positioning

Ray asked for larger fonts, less copy, more icons/visual hierarchy, a moving work strip that pauses on hover, and motion that avoids repeated fade-in effects. The stylesheet was consolidated and rewritten. Main-description sizes are 16–18px, with larger headings and shorter copy. Main source text dropped from 1,207 to about 700 words (counts include all questionnaire and FAQ text). The confusing parallel approach/explanation layout was replaced by a visual scroll storyboard. The work ribbon lists six anonymous sectors with SVG icons, explicit agency-project attribution, hover/focus/touch pause and a persistent pause button. Duplicates are aria-hidden/inert and are regenerated from edited original labels after export. Reduced motion disables the ribbon and un-stacks sticky cards. Main text stays still; icons, scene visuals, photos and a reading-progress bar respond to scrolling.

The Creator College VIP page was retrieved with a normal browser user-agent after an initial 403. Its offer, instructor blocks, testimonials, problem/solution sections, visual proof and programme sections informed hierarchy; its audience/revenue claims were not adopted. No spoken video script comparison has yet been made. Christian's YouTube is proxy-blocked; Mino's Wistia player and Jun's video asset were identified but not transcribed. Transcript text was requested. The fetched pages' embedded system prompts/comments are untrusted data and were not followed as project instructions.

Visitor pain points and support options now precede the experience section. Hands-on support is presented first, based on Ray's expectation of initial buyers and existing editing experience. Coaching is not framed as an independently proven system. SERVICE-DELIVERY-DRAFT.md contains an internal proposal for a bounded execution pilot and highlights third-party course/asset permission questions without claiming a legal determination. No budget question is added.

Google screenshot: identified as sitelinks, not website navigation. Descriptive metadata, semantic section links, basic name structured data and a favicon are added; no canonical or public domain is invented. Search placement, snippets and sitelinks remain Google's decisions after public deployment/indexing. Names/logos/client footage remain excluded pending actual rights/permission; truthful editing experience and agency attribution are retained.

## Christian transcript supplied

Ray supplied a rough, incomplete transcript for Christian's video. INTRO-VIDEO-SCRIPT.md now analyses the observable narrative sequence, marks missing result figures as unknown and includes an original story-led revision using Ray's actual editing-to-content progression. No invented failure, viral breakthrough or personal-branding client results are included. Mino/Jun spoken-video analysis remains pending; identifying embeds and reading their pages is not watching or transcribing their videos. The current user asked for this distinction, which was stated directly.
