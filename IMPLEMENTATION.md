# Wedding website

The public pages implement `BUILD_SPEC_FINAL.md` using static HTML, CSS, and JavaScript. No package installation or server-side registration system is required.

## Editing

- Shared page markup and content: `scripts/build_site.py`. Run `python scripts/build_site.py` after editing it. The FAQ answers are read from `BUILD_SPEC_FINAL.md` during generation.
- Shared responsive styles: `css/global.css`.
- Navigation, opening transition, and tabs: `js/main.js`.
- Gallery controls: `js/gallery.js`.
- Final media and external links: `js/config.js`.

The older page-specific CSS files are retained but no longer loaded. Old story, map, party, gifts, and thank-you URLs redirect to the appropriate current pages.

## Final content still needed

1. External RSVP URL. Set `rsvpUrl` to the final HTTPS destination. Until then the button is unavailable, with a visible explanation; there is no fake RSVP destination.
2. Coordinator name and contact details in `coordinator`.
3. Three Home photographs in `homePhotos`, in story-moment order.
4. Around 15–20 prenup photographs in `prenupPhotos`. Each photo uses `{src, alt}`. The slideshow includes arrows, swipe, thumbnails, a counter, progress, and a native dialog lightbox. It appears when photos are configured.
5. Save the Date video: direct MP4/WebM URL or local path in `saveTheDateVideo`, plus optional `videoPoster`. No autoplay.
6. Verify ceremony and reception venue pins and the actual route before publishing. Current buttons open Google Maps searches/directions using the approved venue names and addresses. Replace them with verified URLs in `links`.
7. Review the responsive SVG attire illustrations against final supplier references. These are representative color/style guides, not final supplier assets.

The assets folders currently contain only `.gitkeep` files. No actual couple photographs or video were supplied. Missing media uses honest coming-soon states.

## Local preview

Run `python -m http.server 8000 --bind 127.0.0.1`, then open `http://127.0.0.1:8000`.

Countdown: February 7, 2027 at 10:00 AM, Asia/Manila (UTC+08:00).
