# Scrolling update

Lenis 1.3.27 provides wheel smoothing on fine-pointer screens wider than 800px. Touch stays native. Reduced motion, Pause animations, text editing and an open video dialog destroy the smoothing instance and restore native scrolling; it is recreated when appropriate. Missing library access also falls back to native scrolling.

Same-page anchors use an absolute destination and a sticky-header offset; focus and URL hash update after arrival. Form areas and editable fields opt out of wheel smoothing. The resource signup remains paused; the existing service Typeform stays connected.

Scroll effects: decorative story ribbon, slight card rotation, scene scaling, portrait framing; hover feedback remains available. The offline editable export includes Lenis and removes transient scroll state before reinitializing.

The reference https://lenis.dev/ was blocked by the environment proxy. Implementation is based on the official package documentation, not a verified copy of that demo's choreography.

Browser checks: actual wheel interpolation; ribbon response; application anchor; 1440/1024/768/390/320px bounds; touch-native and reduced-motion behavior; pause/resume; editing; standalone export; missing-library fallback. The external Typeform was stubbed; no live response was submitted.
