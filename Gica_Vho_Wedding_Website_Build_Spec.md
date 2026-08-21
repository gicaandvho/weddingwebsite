# Gica & Vho Wedding Website --- Build Specification

## Project

**Name:** Gica & Vho --- The Ultimate Co-Op Campaign\
**Wedding Date:** February 7, 2027\
**Location:** Pooc / Silang, Cavite, Philippines

## 1. Design Direction

Create a wedding website that feels like:

> **A premium wedding invitation first, a retro RPG second.**

The design should be light, romantic, elegant, playful, and easy to use.

### Visual style

-   Soft retro / 16-bit-inspired pixel art
-   Wedding-appropriate rather than dark or overly "gamer"
-   Cream / ivory as the primary surface
-   Dusty blush / muted burgundy as the accent
-   Warm antique gold for borders and highlights
-   Soft sage / muted green as a secondary accent
-   Deep navy only for selected headers, navigation, or contrast areas
-   Floral and romantic details used sparingly
-   Rounded or softly clipped cards rather than aggressive game HUD
    elements

### Suggested palette

``` text
Cream / Ivory       #FFF8EA
Warm Cream          #F7EEDC
Dusty Blush         #D98F8F
Burgundy            #8C3F4D
Antique Gold        #B89555
Soft Sage           #A8B59A
Deep Navy           #233047
Warm Brown          #604B3A
Dark Text           #352D29
```

Use the palette consistently. Avoid neon colors, heavy black
backgrounds, excessive glow, or overly complex game effects.

------------------------------------------------------------------------

# 2. Core UX Strategy

Use a **hybrid website structure**:

-   The **Opening Screen** is a full-screen experience.
-   The **Home Page / Quest Hub** is a scrolling page.
-   Major content areas open as their own pages.
-   Keep navigation consistent across every page.
-   The site should feel like one continuous wedding adventure.

### Guest journey

``` text
OPENING
   ↓
HOME / QUEST HUB
   ↓
OUR STORY
   ↓
WEDDING DAY
   ↓
CAMPAIGN MAP
   ↓
PARTY MEMBERS
   ↓
PLAYER GUIDE
   ↓
FINAL QUEST / RSVP
   ↓
GIFTS & WISHES
   ↓
THANK YOU
```

------------------------------------------------------------------------

# 3. Responsive Strategy

Build one GitHub Pages website with responsive layouts.

Do **not** maintain two separate websites.

## Desktop

Use a wider RPG-inspired dashboard:

``` text
┌────────────────────────────────────────────────────────────┐
│ GICA ♥ VHO                         DATE / MUSIC / RSVP      │
├───────────────┬──────────────────────────────┬─────────────┤
│ QUEST MENU    │                              │ QUICK INFO  │
│               │       MAIN CONTENT           │             │
│ OUR STORY     │                              │ COUNTDOWN   │
│ WEDDING DAY   │                              │             │
│ MAP           │                              │ OBJECTIVE   │
│ PARTY         │                              │             │
│ GUIDE         │                              │             │
│ RSVP          │                              │             │
└───────────────┴──────────────────────────────┴─────────────┘
```

## Mobile

Use an app-like interface:

``` text
┌───────────────────────┐
│ ♥ GICA & VHO       ☰ │
├───────────────────────┤
│                       │
│     MAIN CONTENT      │
│                       │
├───────────────────────┤
│ STORY MAP PARTY RSVP  │
└───────────────────────┘
```

### Mobile principles

-   Mobile-first content hierarchy
-   Large tap targets
-   Bottom navigation for the main sections
-   Hamburger menu for secondary sections
-   No keyboard controls
-   No unnecessary animations
-   No horizontal scrolling
-   Keep text readable without zooming

### Suggested breakpoints

``` text
≥ 1200px       Desktop
769–1199px     Tablet / small laptop
≤ 768px        Mobile
```

------------------------------------------------------------------------

# 4. Website Pages

## 01 --- Opening Screen

### Purpose

Create the emotional first impression.

### Content

``` text
GICA ♥ VHO

THE ULTIMATE
CO-OP CAMPAIGN

Two Players. One Love.
One Unforgettable Adventure.

02 • 07 • 27

[ PRESS START ]
```

### Visual

Use one optimized hero illustration of Gica and Vho.

Avoid putting the entire interface into one image.

### Interaction

Clicking **Press Start** transitions to the Home / Quest Hub.

------------------------------------------------------------------------

# 5. Home Page / Quest Hub

## Purpose

Give guests an immediate overview and guide them through the website.

### Content

-   Gica & Vho
-   Wedding date
-   Countdown
-   Short introduction
-   Hero artwork
-   Quick links to all major sections
-   Final Quest / RSVP call-to-action

### Suggested headline

> **THE ULTIMATE CO-OP CAMPAIGN**

### Supporting line

> Two Players. One Love. One Unforgettable Adventure.

### Countdown

``` text
NEXT QUEST: WEDDING DAY

07 FEBRUARY 2027

[ DAYS ] [ HOURS ] [ MINUTES ] [ SECONDS ]
```

### Home page sections

1.  Hero
2.  Wedding date / countdown
3.  Short Our Story preview
4.  Wedding Day preview
5.  Campaign Map preview
6.  Party Members preview
7.  Player Guide preview
8.  Final Quest / RSVP
9.  Closing message

The homepage should be scrollable.

------------------------------------------------------------------------

# 6. Our Story

## Concept

**Quest Log / Our Journey**

Tell the relationship story as a progression rather than a conventional
biography.

### Suggested structure

``` text
LEVEL 01 — FIRST ENCOUNTER
LEVEL 02 — FIRST ADVENTURE
LEVEL 03 — MANY MEMORIES
LEVEL 04 — THE PROPOSAL
FINAL LEVEL — THE WEDDING
```

Each entry can contain:

-   Date / year
-   Short description
-   1--3 photographs
-   Optional pixel-art decoration

Keep text concise.

------------------------------------------------------------------------

# 7. Gallery

## Concept

**Memory Archive**

Use a lightweight photo gallery.

### Categories

-   Pre-Wedding
-   Our Adventures
-   Travel Quests
-   The Proposal
-   Other Memories

### Performance requirements

-   Use WebP or optimized JPEG
-   Generate thumbnails
-   Use `loading="lazy"`
-   Do not load the entire gallery at initial page load
-   Open full-resolution images only when selected
-   Use responsive image sizes

Example:

``` html
<img
  src="assets/gallery/photo-01.webp"
  loading="lazy"
  alt="Gica and Vho">
```

------------------------------------------------------------------------

# 8. Wedding Timeline

## Concept

**Quest Timeline**

Show the wedding day as a visual progression.

### Structure

``` text
WEDDING DAY
07 FEBRUARY 2027

CEREMONY
↓
TRANSFER
↓
RECEPTION
↓
GAMES / ACTIVITIES
↓
DINNER
↓
DANCE / CELEBRATION
```

Use actual final times once confirmed.

Each event should have:

-   Time
-   Event name
-   Location
-   Small icon
-   Optional short note

------------------------------------------------------------------------

# 9. Campaign Map

## Concept

A simplified pixel-art map showing the wedding journey.

### Locations

**01 --- Ceremony** San Antonio de Padua Parish\
Pooc, Silang, Cavite

**02 --- Reception** Cana at Silang\
Pooc 1, Silang, Cavite

### Optional map points

-   Parking
-   Entrance
-   Nearby hotels
-   Nearby restaurants
-   Other useful landmarks

### Buttons

``` text
[ GET DIRECTIONS ]
[ VIEW CEREMONY ]
[ VIEW RECEPTION ]
```

The map artwork should be optimized and should not contain all text as
part of the image.

------------------------------------------------------------------------

# 10. Party Members / Entourage

## Concept

**Our Party**

Introduce the people who are part of the wedding.

### Categories

-   Principal Sponsors
-   Bridesmaids
-   Groomsmen
-   Family
-   Other important members

### Character card

Each card can include:

``` text
[ SMALL PIXEL CHARACTER ]

NAME
ROLE

[ VIEW OUTFIT ]
```

### Outfit Reference

Clicking **View Outfit** opens a modal containing:

-   Outfit reference image
-   Color description
-   Accessories
-   Shoes / other requirements
-   Optional notes

Do not create the entire card as a single image.

------------------------------------------------------------------------

# 11. Player Guide / FAQs

## Concept

**Player Guide**

Subtitle:

> Everything you need before the quest begins.

Use expandable FAQ / accordion components.

### Suggested questions

-   How does the wedding game work?
-   Where do I get my Player Kit?
-   How do the food tokens work?
-   What games can I play?
-   How do I redeem souvenirs?
-   What should I wear?
-   Where can I park?
-   What time should I arrive?
-   Can I take photos?
-   Are children included?
-   What should I do if I have questions?

Add additional questions as needed.

### Wedding game information

This section can explain the physical wedding experience:

-   Player Kit
-   Coins
-   Food stubs
-   Arcade games
-   Board games
-   Souvenirs
-   Prizes
-   Game mechanics

------------------------------------------------------------------------

# 12. RSVP / Final Quest

## Concept

Make RSVP the emotional "final quest."

### Opening

``` text
FINAL QUEST

Will you join our party guild?

FEBRUARY 7, 2027

[ ACCEPT QUEST ]
[ MAYBE LATER ]
```

### RSVP form

Include only necessary fields, such as:

-   Name
-   Attendance
-   Number of guests
-   Meal preference, if applicable
-   Message / notes, if needed

### Confirmation

``` text
QUEST ACCEPTED!

Your party slot has been reserved.

We can't wait to celebrate
this adventure with you!

♥ GICA & VHO
```

Use an accessible, conventional HTML form underneath the game styling.

------------------------------------------------------------------------

# 13. Gifts & Wishes

## Concept

**Treasure Chest**

Opening message:

> Your presence is already the greatest gift.

Sections:

### Gifts

Gift preferences / registry information.

### Cash Gifts

Bank / GCash / other details if desired.

### Wishes

Allow guests to leave a short message.

Keep this page simple and elegant.

------------------------------------------------------------------------

# 14. Thank You Page

## Concept

**QUEST COMPLETE!**

Use one beautiful final illustration.

### Copy

``` text
QUEST COMPLETE!

Thank you for being part
of our greatest adventure.

GICA ♥ VHO

07 • 02 • 27

Same Team. New Adventure.
```

Optional button:

``` text
[ RETURN TO QUEST HUB ]
```

------------------------------------------------------------------------

# 15. Navigation

## Desktop primary navigation

``` text
♥ OUR STORY
⚔ WEDDING DAY
🗺 CAMPAIGN MAP
👥 PARTY MEMBERS
🎮 PLAYER GUIDE
✉ RSVP
```

Secondary navigation:

``` text
📸 Gallery
🎁 Gifts & Wishes
⏳ Countdown
❤️ Thank You
```

## Mobile bottom navigation

Keep four or five items:

``` text
♥ STORY
🗺 MAP
👥 PARTY
🎮 GUIDE
✉ RSVP
```

Secondary pages can be accessed through the hamburger menu.

------------------------------------------------------------------------

# 16. Performance / Image Strategy

This is a major project requirement.

## Target

The website should feel visually rich without being image-heavy.

### Recommended balance

``` text
~70% HTML + CSS + JavaScript
~20% optimized illustrations
~10% photography / other media
```

### Use HTML/CSS for

-   Navigation
-   Buttons
-   Cards
-   Borders
-   Countdown
-   Typography
-   FAQ accordions
-   Timeline lines
-   Background gradients
-   Simple icons
-   Animations
-   Decorative shapes

### Use images for

-   Main hero artwork
-   Gica & Vho pixel characters
-   Campaign map
-   Character / entourage portraits
-   Outfit references
-   Actual wedding / pre-wedding photographs
-   Gallery photos

### Avoid

-   Full-page PNG screenshots
-   Image-based text
-   Image-based buttons
-   Image-based navigation
-   Giant decorative backgrounds
-   Multiple large GIFs
-   Autoplay video
-   Uncompressed PNG/JPEG files

------------------------------------------------------------------------

# 17. Asset Strategy

Recommended folder structure:

``` text
assets/
├── hero/
│   ├── desktop.webp
│   └── mobile.webp
│
├── characters/
│   ├── gica.webp
│   ├── vho.webp
│   ├── sponsors/
│   ├── bridesmaids/
│   └── groomsmen/
│
├── map/
│   └── campaign-map.webp
│
├── story/
│   ├── story-01.webp
│   ├── story-02.webp
│   └── story-03.webp
│
├── gallery/
│   ├── photo-01.webp
│   ├── photo-02.webp
│   └── ...
│
├── outfits/
│   ├── bridesmaids.webp
│   └── groomsmen.webp
│
└── icons/
    ├── heart.svg
    ├── map.svg
    ├── party.svg
    ├── guide.svg
    └── rsvp.svg
```

------------------------------------------------------------------------

# 18. Image Guidelines

### Hero

Desktop: - Around 1600--1920px wide - WebP - Preferably under \~500--700
KB

Mobile: - Around 750px wide - WebP - Preferably under \~250--400 KB

### Character images

-   Approximately 200--400px
-   WebP or optimized PNG
-   Transparent background where useful

### Gallery

-   Use thumbnails
-   WebP / optimized JPEG
-   Lazy load
-   Full-size version only after clicking

### Icons

Prefer SVG.

------------------------------------------------------------------------

# 19. Animation Guidelines

Animations should be subtle.

### Good

-   Floating hearts
-   Gentle pixel particles
-   Fade transitions
-   Small button movement
-   Soft character idle animation
-   Scroll reveal
-   Countdown transitions

### Avoid

-   Constant screen movement
-   Heavy parallax
-   Flashing elements
-   Large particle effects
-   Autoplay video
-   Excessive sound effects

Provide reduced-motion support:

``` css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}
```

------------------------------------------------------------------------

# 20. Typography

Use a combination of:

### Pixel / retro font

For:

-   Page titles
-   Quest names
-   Buttons
-   Numbers
-   Labels

### Elegant readable font

For:

-   Story text
-   Wedding details
-   FAQ answers
-   Venue information
-   Longer paragraphs

Avoid using a pixel font for long paragraphs.

------------------------------------------------------------------------

# 21. Accessibility

The wedding website should remain easy to use even if the guest does not
understand the game theme.

Requirements:

-   All buttons must have readable text
-   Do not rely on icons alone
-   Good contrast
-   Keyboard-accessible desktop navigation
-   Touch-friendly mobile buttons
-   Meaningful image `alt` text
-   Form labels
-   Visible focus states
-   Avoid text embedded only inside images
-   Respect `prefers-reduced-motion`

The game theme should be a layer on top of a normal, understandable
website.

------------------------------------------------------------------------

# 22. Technical Stack

Recommended:

``` text
HTML5
CSS3
Vanilla JavaScript
GitHub Pages
WebP / SVG assets
```

No framework is required initially.

This keeps the site:

-   Lightweight
-   Easy to edit
-   Easy to host
-   Easy to troubleshoot
-   Fast on mobile

A framework can be introduced later only if the site becomes
sufficiently complex.

------------------------------------------------------------------------

# 23. Suggested Repository Structure

``` text
vhogica-weddingsite/
│
├── index.html
├── story.html
├── gallery.html
├── wedding.html
├── map.html
├── party.html
├── guide.html
├── rsvp.html
├── gifts.html
├── thank-you.html
│
├── css/
│   ├── global.css
│   ├── desktop.css
│   └── mobile.css
│
├── js/
│   ├── main.js
│   ├── countdown.js
│   ├── gallery.js
│   ├── faq.js
│   └── rsvp.js
│
├── assets/
│   ├── hero/
│   ├── characters/
│   ├── map/
│   ├── story/
│   ├── gallery/
│   ├── outfits/
│   └── icons/
│
└── README.md
```

------------------------------------------------------------------------

# 24. Development Order

Build in this order to avoid unnecessary rework.

## Phase 1 --- Foundation

1.  Set up HTML structure
2.  Set up global CSS
3.  Establish colors and typography
4.  Create responsive breakpoints
5.  Create shared navigation
6.  Create buttons / cards / panels

## Phase 2 --- Core Experience

7.  Opening Screen
8.  Home / Quest Hub
9.  Countdown
10. Mobile navigation
11. Desktop navigation

## Phase 3 --- Content

12. Our Story
13. Gallery
14. Wedding Timeline
15. Campaign Map
16. Party Members
17. Player Guide

## Phase 4 --- Guest Actions

18. RSVP
19. Gifts & Wishes
20. Thank You page

## Phase 5 --- Optimization

21. Compress images
22. Add lazy loading
23. Optimize fonts
24. Test mobile
25. Test desktop
26. Test slow connection
27. Test accessibility
28. Test all links
29. Test RSVP submission
30. Final GitHub Pages deployment

------------------------------------------------------------------------

# 25. Definition of Done

The website is ready when:

-   Opening screen works on desktop and mobile
-   Home page clearly communicates the wedding date
-   Countdown works
-   All navigation links work
-   Story is readable and visually engaging
-   Gallery loads progressively
-   Timeline is easy to understand
-   Church and reception are clearly identified
-   Map / directions work
-   Entourage list is readable
-   Outfit references are easy to access
-   FAQ / Player Guide is searchable or expandable
-   RSVP works
-   Gifts & Wishes are clear
-   Thank You page works
-   Mobile layout does not require zooming
-   No horizontal scrolling
-   Images are optimized
-   Initial page load is lightweight
-   Reduced-motion support works
-   The site still looks like a wedding website even without
    understanding the game theme

------------------------------------------------------------------------

# 26. Design Rule to Keep Throughout the Project

## "Wedding first. Game second."

Every design decision should pass this test:

> **Would this still look beautiful and appropriate if the guest didn't
> play video games?**

If yes, keep it.

If it looks too much like a gaming website, simplify it.

The final experience should feel like:

**Romantic wedding invitation × light retro RPG × personal love story**

---not a video game website with wedding information added to it.
