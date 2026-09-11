# Pixel-art assets

All artwork is illustrative, not a factual rendering of the couple, venues, or driving route.

- `wedding-world.png`: unchanged copy of the user-supplied `Background image.png`. Used as the title-screen background, Home scene, decorative page/footer backgrounds, and cropped venue vignettes.
- `story-triptych.png`: generated three-panel story illustration. CSS displays its left, middle, and right thirds as the three approved story moments.
- `journey-map.png`: generated schematic church-to-reception garden route.
- `invitation-still-life.png`: generated wedding stationery vignette for Gifts and RSVP.

The three generated images use the built-in image-generation tool with the uploaded background as a style reference. No real photos were used. The original generated images remain in the tool's output folder; production copies are kept here. Small UI icons remain deterministic inline SVG in `scripts/build_site.py`. Outfit figures now use generated portraits; see `outfits/ARTWORK.md` for their reference and generation prompts.

## Generation prompts
### story

Use the attached artwork only as a style and palette reference. Create a single wide horizontal triptych illustration asset for an elegant pixel-art wedding website, three EQUAL WIDTH panels edge to edge with no borders or gutters, landscape aspect ratio 3:1. Delicate sophisticated 16-bit pixel art, warm cream light, navy shadows, burgundy roses, antique gold, muted sage, visible tiny square pixels, no photorealism. LEFT THIRD: symbolic unexpected meeting, two small elegant adult silhouettes facing each other on a garden pathway beneath flowering branches and a tiny burgundy heart, no specific real place. CENTER THIRD: symbolic shared adventures, a vintage suitcase, paper airplane and distant Japanese-inspired garden bridge and soft travel landscape. RIGHT THIRD: next chapter, small back-view adult bride and groom on a floral path toward a luminous wedding garden arch. Romantic refined wedding storybook, sophisticated proportions, no chibi, no text, letters, labels, logos or watermarks. Each scene must be individually usable when the image is shown in three equal panels; important subjects centered within each third. This is an illustration of story themes, not a literal depiction of real events.

### route

Use attached artwork only as style reference. Generate one wide landscape 2:1 illustration of a schematic wedding journey, sophisticated fine 16-bit pixel art. Warm ivory background and daylight, muted sage garden, antique gold, burgundy flower accents, navy outlines. A small stylized cream wedding church on the LEFT, an elegant low cream garden reception pavilion on the RIGHT, a curved pale stone path connects them through a quiet garden, tiny vintage car on the path, one discreet heart waypoint. Birds-eye oblique storybook view, plenty of ivory negative space, readable distinct endpoints, refined decorative game map. Not an actual road map or verified architectural rendering. No text, no names, no signs with writing, no lettering, no menus, no watermark. Clear crisp small pixel clusters, not smooth vector, not photorealistic, not childish, no dark sky.

### stationery

Use attached artwork as palette and pixel-art style reference only. Create an elegant 3:2 landscape pixel-art still life asset for wedding invitation and gifts sections. A cream open envelope and blank ivory invitation card tied with a narrow burgundy silk ribbon, small burgundy heart wax seal, tasteful white flowers with sage leaves resting beside it. Sophisticated fine 16-bit pixel clusters, delicate antique-gold detailing, soft warm light, no photorealism. Centered composition, airy warm-ivory #faf7f0 background, objects occupy middle 70%, no frame, no text, no lettering or numbers, no logo, no cash, no currency, no game loot or presents stack. Romantic premium wedding stationery, not childish.


## Mobile opening artwork — 2026-09-08

- Asset: `wedding-world-mobile.png` (941 × 1672, approximately 9:16).
- Created with the built-in imagegen tool, using `wedding-world.png` as style/subject reference only. Original desktop asset unchanged.
- Original output: `exec-d2f802d0-49ae-4c14-a079-d3379d2fe338.png`.
- Prompt: Create a NEW portrait 9:16 wedding opening screen background, reference image is style and subject reference only, not a crop. Match its refined fine pixel-art, warm cream/navy/burgundy/muted gold palette, church, CANA reception building, flowers, clouds, hearts and path. Recompose for phone: full thin gold decorative rectangular outer border inset safely on ALL FOUR sides, small burgundy corner hearts. Church lower left and CANA lower right, both entirely within border; buildings and landscape/path/florals primarily bottom 25 percent. Upper and middle 70 percent a very calm light cream empty field for HTML title overlay, clouds only faint and peripheral, no important art behind central text. Elegant romantic premium pixel art, same architecture cues. No title, no date, no button or UI lettering; only CANA on venue facade. Portrait 9:16 output. Preserve full frame and both landmarks, do not crop landscape reference. Save as new artwork.
