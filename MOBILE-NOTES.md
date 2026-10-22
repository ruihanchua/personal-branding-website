# Mobile interface update

Phone and tablet layouts up to 800px now use a compact sticky header, a native details-based menu with Escape/outside-click/link dismissal, a shorter Work with me label, full-width main buttons, readable spacing and safe-area padding. The headline, copy and portrait use less vertical space.

The approach cards read as separate blocks on phones instead of overlapping sticky cards. Industries are a manually swipeable row with a visible hint. The biography timeline becomes readable rows. FAQ and navigation controls have generous tap areas. The Typeform has a prominent new-tab alternative and viewport-aware embed height. Service scope, three FAQs, form destination and paused resources are preserved.

Desktop Lenis and depth treatment are retained. The self-contained editable export includes the mobile layout and resets an open mobile menu before download.

Checks passed: 320×568, 360×640, 375×667, 390×844, 430×932 and 768×1024 touch viewports; no horizontal page overflow; menu and Escape; section anchors; nonoverlapping approach cards; swipe rail; minimum menu target dimensions; native touch scrolling; application links and form-field interaction with a test iframe; reduced motion; export. Existing desktop scrolling/fallback suite passed too. External Typeform was stubbed, so no live application was submitted. Emulation does not replace checking Instagram's browser on a real phone.
