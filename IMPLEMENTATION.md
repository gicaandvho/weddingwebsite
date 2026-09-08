# Wedding website

The public pages implement `BUILD_SPEC_FINAL_V2.md` (Final Approved Website Specification — Pixel Art Direction Update) using static HTML, CSS, and JavaScript. This is the updated specification supplied in this checkout; the longer filename mentioned in the request was not present. No package installation or server-side registration system is required.

## Editing

- Shared page markup and content: `scripts/build_site.py`. Run `python scripts/build_site.py` after editing it. The FAQ answers are read from `BUILD_SPEC_FINAL_V2.md` during generation.
- Shared responsive styles: `css/global.css`; the illustrated V2 visual system is in `css/pixel.css`, loaded after it.
- Navigation, opening transition, and tabs: `js/main.js`.
- Gallery controls: `js/gallery.js`.
- Final media and external links: `js/config.js`.

The older page-specific CSS files are retained but no longer loaded. Old story, map, party, gifts, and thank-you URLs redirect to the appropriate current pages.

## Final content still needed

1. External RSVP URL. Set `rsvpUrl` to the final HTTPS destination. Until then the button is unavailable, with a visible explanation; there is no fake RSVP destination.
2. Coordinator name and contact details in `coordinator`.
3. Around 15–20 real prenup photographs in `prenupPhotos`. Each photo uses `{src, alt}`. The slideshow includes arrows, swipe, thumbnails, a counter, progress, and a native dialog lightbox. It appears when photos are configured, only in Gallery.
4. Save the Date video: direct MP4/WebM URL or local path in `saveTheDateVideo`, plus optional `videoPoster`. No autoplay. Real video belongs only in Gallery.
5. Verify ceremony and reception venue pins and the actual route before publishing. Current buttons open Google Maps searches/directions using the approved venue names and addresses. Replace them with verified URLs in `links`.
6. Review the responsive pixel-style SVG attire illustrations against final supplier references. These are representative color/style guides, not final supplier assets.

Non-gallery images are pixel-art illustrations stored in `assets/pixel/`. The supplied background is copied to `wedding-world.png`; three matching generated assets support the story, journey, and invitation sections. See `assets/pixel/ARTWORK.md` for provenance and prompts. Venue scenes and the route are thematic illustrations, not verified architectural or road depictions. The former Home photo configuration has been removed intentionally under the V2 direction.

No actual prenup photographs or video were supplied. Gallery retains honest coming-soon states until media is configured.

## Local preview

Run `python -B scripts/serve_site.py`, then open `http://127.0.0.1:8000`. This loopback-only preview sends `Cache-Control: no-store` for every response and ignores conditional cache validators. Do not use the bare `python -m http.server` command for this project preview. The root URL and `/index.html` serve the same file. An already-open old document needs one normal reload after switching servers; subsequent navigations and reloads receive current bytes.

Countdown: February 7, 2027 at 10:00 AM, Asia/Manila (UTC+08:00).

## Validation

Run `python -B scripts/check_site.py`, `node scripts/check_countdown.cjs`, `node --check` for each JavaScript file, and `git diff --check`. Site checks include CSS image references and the non-gallery illustration rule. The nested Outfit Guide anchor offset from Phase 5G remains in the shared stylesheet.

## First-render stability

The generator emits content-hashed CSS/JavaScript query versions. Regenerate HTML after changing these source assets; site checks reject stale versions. Both CSS links remain synchronous in the head, global first and pixel second. Script dependency order remains config, main, then page-specific scripts, all deferred. Fonts are local system stacks, with no late web-font swap.

Generated PNG elements carry their intrinsic dimensions before loading. Home artwork loads eagerly and the opening background is preloaded; below-fold artwork remains lazy. Existing scene containers retain their sizes and cropping. Press Start uses a centered responsive lockup and an aspect-preserving cover background, with a central-path crop on portrait screens.

The previous bare Python server supplied Last-Modified validators without an explicit cache policy; its timestamp comparison has one-second precision. The audit observed cached Home HTML referencing old CSS hashes, while a fresh URL matched the current generated file. Asset hashes alone cannot refresh a cached HTML document. The new local preview bypasses both storage and conditional reuse, including redirect responses. There is no service-worker code in this project. This is a local-preview policy: configure the production host to revalidate HTML (for example, `Cache-Control: no-cache` with accurate validators), deploy HTML/assets together, and retain asset versioning.

Run `python -B scripts/check_preview.py` to verify real HTTP responses, including a simulated rebuild with an unchanged modification timestamp. Intrinsic image dimensions and eager Home artwork loading remain in place; no delays or client-side cache-busting redirects are used.

## Readability and direct guest pages

The six primary destinations are Home, Wedding Details, Outfit Guide, FAQ & Gifts, Gallery, and RSVP. `outfit.html` owns attire, entourage tabs and supplier details; `faq-gifts.html` owns the guest-list note, ten FAQs and Gifts. `guide.html` is a compatibility page using `js/redirect-guide.js` to preserve recognized old hashes. Without JavaScript it offers both destination links. Party and Gifts legacy redirects point directly to the new pages.

Wedding Details shows both venue cards together, in equal desktop columns and a mobile stack, followed by the existing Journey and timeline. Pixel CSS adds readable body/label sizes and refined ivory/burgundy buttons with thin gold details. Approved wording, art and palette remain unchanged. These usability requirements supersede the V2 spec's older Guest Guide navigation structure.

## Small-phone refinement

At widths up to 340px, the countdown frame uses slightly smaller outer/inner horizontal gutters to give its unchanged four cells more separation without adding height. Palette names reserve two lines so hex codes align even when a name wraps. Typography, content, and styles at 390px and desktop are unchanged.
