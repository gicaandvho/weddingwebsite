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

Run `python -m http.server 8000 --bind 127.0.0.1`, then open `http://127.0.0.1:8000`.

Countdown: February 7, 2027 at 10:00 AM, Asia/Manila (UTC+08:00).

## Validation

Run `python -B scripts/check_site.py`, `node scripts/check_countdown.cjs`, `node --check` for each JavaScript file, and `git diff --check`. Site checks include CSS image references and the non-gallery illustration rule. The nested Outfit Guide anchor offset from Phase 5G remains in the shared stylesheet.

## First-render stability

The generator emits content-hashed CSS/JavaScript query versions. Regenerate HTML after changing these source assets; site checks reject stale versions. Both CSS links remain synchronous in the head, global first and pixel second. Script dependency order remains config, main, then page-specific scripts, all deferred. Fonts are local system stacks, with no late web-font swap.

Generated PNG elements carry their intrinsic dimensions before loading. Home artwork loads eagerly and the opening background is preloaded; below-fold artwork remains lazy. Existing scene containers retain their sizes and cropping. Press Start uses a centered responsive lockup and an aspect-preserving cover background, with a central-path crop on portrait screens.

The local Python preview uses Last-Modified/conditional requests, not a service worker. Versioned asset URLs prevent new generated HTML from reusing older CSS/JS responses. They do not update an already-open document or invalidate separately cached HTML; serve HTML with revalidation when deploying, and deploy generated HTML and its source assets together.

The historical transient misalignment was not captured, so a single historical cause cannot be proven. Missing lazy-image dimensions were a confirmed layout-shift risk; unversioned assets were a cache-consistency risk. Browser checks found matching page geometry on initial and repeated navigations. The browser automation available here does not expose cache clearing or a hard-reload command, so those exact cache modes require a separate manual check.
