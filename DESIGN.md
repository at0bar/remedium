---
name: Remedium
description: A tactical field dashboard — flat dark reference console for alliance operations.
colors:
  background: "#0d0e10"
  background-alt: "#13151a"
  surface: "#1f222b"
  surface-alt: "#1a1d24"
  foreground: "#d6d8e0"
  foreground-muted: "#8a8e9a"
  foreground-subtle: "#555966"
  foreground-inverse: "#ffffff"
  border: "rgba(255,255,255,0.07)"
  border-strong: "rgba(255,255,255,0.13)"
  accent: "#c9a84c"
  accent-light: "#e8c96b"
  accent-dim: "rgba(201,168,76,0.12)"
  destructive: "#e05252"
  destructive-dim: "rgba(224,82,82,0.08)"
  info: "#5b9cf6"
  info-dim: "rgba(91,156,246,0.08)"
  faction-warrior: "#e05252"
  faction-ranger: "#5b9cf6"
  faction-warlock: "#4caf7a"
  class-tank: "#e8a83e"
  class-carry: "#a78bfa"
  class-support: "#3ecfb2"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontWeight: 800
    textTransform: "uppercase"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Barlow, sans-serif"
    fontSize: "13-15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Share Tech Mono, monospace"
    fontSize: "9-11px"
    letterSpacing: "0.1-0.22em"
    textTransform: "uppercase"
rounded:
  default: "6px"
  badge: "3px"
spacing:
  hairline: "1px"
  border: "1px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"
components:
  card-default:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.default}"
    padding: "16px 18px"
  badge-default:
    backgroundColor: "rgba(255,255,255,0.05)"
    textColor: "{colors.foreground-muted}"
    rounded: "{rounded.badge}"
    padding: "2px 7px"
  nav-link-active:
    textColor: "{colors.accent}"
    backgroundColor: "{colors.accent-dim}"
    borderLeft: "2px solid {colors.accent}"
---

# Design System: Remedium

## 1. Overview

**Creative North Star: "A field dossier for a dying world."**

Remedium is a flat, dark tactical console — imagine a classified ops manual rendered as a web app: charcoal-black pages, gunmetal panels, a condensed display voice for headings and a monospace whisper for labels and metadata. It's dense and reference-oriented, built to be scanned fast during an active alliance event, not admired at length. There is no elevation system: no drop-shadows, no glow, no glass. Depth comes entirely from layered near-black tones (`--ink` → `--ink2` → `--ink3` → `--panel`) and hairline borders at low white-alpha, never from shadow or blur.

The voice is split by job, not by decoration. Barlow Condensed (bold, uppercase, tight tracking) is the display register — section titles, card titles, badge-adjacent headings, sidebar nav. Barlow (regular weight) carries body copy and list text — the only place the UI relaxes out of uppercase. Share Tech Mono is reserved for chrome: section numbers, eyebrow labels, table headers, footer meta — anything that wants to read as a system readout rather than prose.

Remedium rejects the glossy "gaming UI" look (glowing borders, beveled gems, ornate frames) and the generic light SaaS look (rounded pill buttons, soft shadows, pastel accents). It is dark-only by design — there is no light mode, no toggle; the ops-dossier framing doesn't survive being flipped to a cream background.

**Key Characteristics:**
- Flat by design. Zero box-shadow anywhere. Depth = stacked near-black surfaces + 1px low-alpha borders, never elevation.
- 6px border-radius used consistently on cards, panels, tables; 3px on badges/chips only. Not zero-radius (unlike a brutalist system), but never a full pill either.
- Condensed-bold uppercase display type paired with a small-caps monospace label voice; body copy is the one un-transformed, non-bold text in the system.
- A single warm gold accent (`#c9a84c`) marks priority, active state, and highlights — everything else is desaturated gunmetal/slate.
- Two independent, non-overlapping color taxonomies: **faction** (warrior/ranger/warlock — red/blue/green) and **class** (tank/carry/support — amber/violet/teal). They must never be reused for one another or for generic UI signal.
- A subtle fractal-noise texture sits behind the whole page at ~2.5% opacity — the one atmospheric touch in an otherwise flat system.

## 2. Colors: The Gunmetal Palette

The palette is a stack of four near-black tones plus one committed warm accent. Everything else — faction hues, class hues, status hues — exists in a strict "dim background + full-saturation text/border" pairing, never as a solid fill.

### Neutral Stack
- **Void** (`#0d0e10`): Page canvas. The deepest layer.
- **Deep Panel** (`#13151a`): Sidebar, banner, table headers — the first layer up from canvas.
- **Card Panel** (`#1f222b`): Cards, squads, event blocks, minister blocks — the primary content surface.
- **Slot Panel** (`#1a1d24`): Nested surfaces one level deeper than a card (hero slots inside a squad card).
- **Text** (`#d6d8e0` → `#8a8e9a` → `#555966`): Primary, muted, subtle — three steps of recession, all cool grey-blue, never pure white or pure black.

### Accent
- **Gold** (`#c9a84c`, light variant `#e8c96b`): The single accent. Used for section numbers, active nav state, priority-list rank cells, milestone chips, tip callouts, and the sole "highlight" badge. Always paired with a 10-15% alpha "dim" background when used as a fill, never as a solid block behind body text.

### Faction Colors (mutually exclusive, in-world meaning)
- **Warrior** (`#e05252`, red)
- **Ranger** (`#5b9cf6`, blue)
- **Warlock** (`#4caf7a`, green)

These identify a hero's in-game faction and the faction counter-relationships. Never repurpose these three hues for a status meaning (e.g. don't use warrior-red for "error" — use `--destructive`, which happens to share the value but is conceptually separate).

### Class Colors (mutually exclusive, in-world meaning)
- **Tank** (`#e8a83e`, amber)
- **Carry** (`#a78bfa`, violet)
- **Support** (`#3ecfb2`, teal)

These identify a hero's combat role. A card, badge, or heading colored by class must never also claim to represent a faction, and vice versa — the two taxonomies run in parallel and readers rely on never seeing them cross.

### Status
- **Destructive** (`#e05252`) — warnings, "don't do this."
- **Info** (`#5b9cf6`) — neutral callouts, background knowledge.
- **Accent-as-tip** (gold) — actionable advice, the "do this" callout.

### Named Rules

**The Dim-Fill Rule.** Every semantic color (faction, class, gold, status) that appears as a background uses a 8-15% alpha tint of itself, paired with the full-saturation value for text and a ~25-30% alpha border. A solid saturated fill is never used as a background — it reads as a button, not a data tag.

**The Two-Taxonomy Rule.** Faction and class are separate color systems that happen to both use "vivid hue on dark." Never let a class-colored element imply faction or vice versa. If a component needs to show both (a hero row), show both explicitly (a faction badge next to a class label/icon) rather than picking one hue to represent the hero.

**The One Warm Accent Rule.** Gold is the only warm color in an otherwise cool-grey + saturated-hue system. It marks "this matters right now" (active nav, priority rank, tip, milestone) — never decoration. If a block needs visual weight but isn't a priority signal, reach for a plain top-border in the relevant faction/class hue instead of gold.

**The No-Elevation Rule.** No `box-shadow` anywhere in the system. Depth is expressed by picking a darker or lighter neutral from the four-step stack and by a hairline border — never by a shadow, glow, or blur. If a component looks like it needs "lift," move it up one panel tone instead.

## 3. Typography

**Display Font:** Barlow Condensed, weights 400-800. Always uppercase in UI chrome contexts (titles, badges, buttons); used at normal case only for the hero title on the banner.
**Body Font:** Barlow, weights 300-500. The only font that appears in sentence case — card body paragraphs, list items, callout text.
**Label / Meta Font:** Share Tech Mono. Always uppercase, always wide-tracked (`letter-spacing: 0.08em` to `0.22em`). Used for section numbers, eyebrow tags, table headers, badges, footer meta.

### Hierarchy
- **Banner Title** (Barlow Condensed 800, ~50px, line-height .95): Page hero title. The one place the accent color is used as an inline text color (a highlighted span), not just a background tint.
- **Section Title** (Barlow Condensed 800, 32px, line-height 1): Paired with a small mono section number (e.g. `01 // HEROES`) to its left and an optional right-aligned muted description.
- **Card / Squad Title** (Barlow Condensed 700-800, 13-15px, uppercase, letter-spacing .04-.06em): The workhorse heading — every card, squad block, event block, minister block uses this exact treatment.
- **Body** (Barlow 400, 13px, line-height 1.4-1.5): Card paragraphs, list items, table cells (except the first column and headers, which stay mono).
- **Eyebrow / Block Label** (Share Tech Mono 400-600, 9-10px, uppercase, tracking .1-.18em): Sits above a group of cards to introduce a subsection (e.g. "Factions & Counter System"); often followed by a flex-grown hairline rule.

### Named Rules

**The Condensed-Uppercase Rule.** Any heading rendered in Barlow Condensed is uppercase with tight-but-not-crushed tracking (~.04-.06em). This is what makes titles read as "briefing headers" rather than article headlines.

**The Mono-Is-Metadata Rule.** Share Tech Mono never carries prose. It is reserved for numbers, labels, table headers, and short tags — the moment a mono string would exceed roughly 4-5 words, switch to Barlow.

**The Body-Never-Uppercase Rule.** Barlow body text is the one un-transformed voice in the system. If you find body copy in caps, it has drifted into label territory and should either become a genuine label (mono, small) or drop the transform.

## 4. Elevation

Remedium has no elevation system. There is no drop-shadow anywhere in the CSS — this is a deliberate rejection of the "floating card" look. Depth exists only as **surface stacking** (four flat neutral tones, darkest to lightest: void → deep panel → card panel → slot panel) plus **hairline borders** at 7-13% white alpha. A card doesn't sit "above" the page; it's a different-toned rectangle inset into the same flat plane.

The only motion in the system is a **fade-up reveal**: elements translate 12px up and fade in on scroll-into-view (`.4s ease`, staggered ~40ms per item via an IntersectionObserver). This is entrance choreography, not elevation — it never implies a floating z-axis.

### Named Rules

**The Flat-Stack Rule.** If a component needs to look "raised," give it the next lighter neutral tone from the four-step stack (e.g. a nested slot inside a card gets `--ink3`, one step recessed from the card's `--panel`), not a shadow.

**The Border-Not-Shadow Rule.** Every panel, card, table wrapper, and callout box is delineated by a 1px border (`--border` at rest, `--border2` for slightly firmer separators like table header rules), never a shadow.

## 5. Components

### Sidebar Navigation
- Fixed, full-height, 240px wide, `--ink2` background, right hairline border.
- Grouped by section with mono uppercase group labels (e.g. "Core Systems", "Combat & Events").
- Each link: a 2-digit mono index + condensed-uppercase label. Active state = gold text + gold left border (2px) + gold dim background wash. Inactive links only shift text tone on hover, no background.

### Banner / Hero
- Full-width panel above content, `--ink2` background, oversized ghost watermark text (~1.8% white opacity, giant condensed type) bleeding off the right edge for texture without competing with real content.
- Eyebrow (mono, gold) → title (condensed 800, white, with an accent-colored inline span for the emphasized word) → description (body, muted) → a row of stat callouts (big condensed number + small mono label underneath).

### Section Header
- A number+title cluster on the left (`sec-num` mono gold, `sec-title` condensed 32px) and an optional right-aligned muted one-line description, separated from content by a hairline bottom border. The description drops on narrow viewports.

### Cards
- `--panel` background, 1px border, 6px radius, `16px 18px` padding.
- Optional **top-border accent** (2px, solid faction or class hue) to tag a card's category — this is the only place a saturated color touches a border directly rather than through the dim-fill formula.
- Title in condensed-uppercase; body as a bullet list (`▸` glyph in gold) or plain paragraph.

### Badges
- Inline mono chips, 9-10px, uppercase, wide-tracked, `2px 7px` padding, 3px radius.
- Formula: dim-alpha background (8-12%) + full-saturation text + ~25-28% alpha border of the same hue. One variant per faction, per class, plus a neutral/gold pair for generic tags.

### Callout Boxes (Tip / Warning / Info)
- Flex row: a short mono icon-label (`TIP`, `WARN`, `INFO`) + body sentence.
- Background is a very faint tint (6% alpha) of the relevant hue (gold / red / blue), 1px border at ~18-20% alpha, plus a **3px solid left border** in the full hue — the one place a colored side-stripe is not just permitted but the signature marker of this component type.

### Priority List
- A bordered, radius-6px container of stacked rows; each row has a fixed-width mono rank cell (gold text on gold-dim background, right hairline border) and a flexible content cell (condensed-uppercase title + muted description line).

### Squad / Roster Block
- A card-level wrapper with a header strip (title + inline badges) and a body grid of "hero slots" — each slot one step recessed (`--ink3`) with a tiny mono role label, a condensed hero name, and a muted type line.

### Tables
- Wrapped in a bordered, radius-6px, `--panel` container. Header row: mono uppercase gold text on `--ink2`. Body rows: hairline bottom borders, subtle hover wash (2% white), first column rendered in muted mono (acts like a row key).
- A specialized **phase table** variant adds a fixed-width "phase badge" first column and small inline mono tag chips within a cell for multi-value rows.

### Tier Blocks
- A ranked-list pattern: a colored header strip (2px top border + faint background tint keyed to tier: teal/blue/gold/red/grey for tiers 1-5) directly above a bordered body panel (no gap, header radius only on top corners, body radius only on bottom corners) — visually one continuous block split into a colored "spine" and a neutral "body."

### Event / Minister Cards
- Same card shell as standard cards, but with an internal header strip (border-bottom separated) holding the title + inline type tag, and a body section below — used for anything with a distinct "name" + "details" structure (events, minister buffs).

## 6. Do's and Don'ts

### Do:
- **Do** use the four-step neutral stack (void / deep panel / card panel / slot panel) to express depth. Deeper content = a step lighter, not a shadow.
- **Do** keep faction colors (warrior/ranger/warlock) and class colors (tank/carry/support) as two strictly separate, never-crossed taxonomies.
- **Do** apply the dim-fill formula (8-15% alpha background + full-saturation text/border) to every colored badge, tag, and callout background.
- **Do** use Share Tech Mono, uppercase, wide-tracked, for every label, number, and table header. It's the "system readout" voice.
- **Do** use the gold accent sparingly: active nav, priority rank, tip callouts, milestones, highlight badges — signals of "pay attention here," never decoration.
- **Do** keep a consistent 6px radius on cards/panels/tables and a separate, tighter 3px radius on badges/chips.
- **Do** use the gold `▸` glyph as the bullet marker inside card lists — it's the small recurring signature of the system, equivalent to Merlin's accent period.
- **Do** use the fade-up-on-scroll reveal for cards, tables, and callouts as they enter the viewport — subtle, staggered, never bouncy.

### Don't:
- **Don't** add any `box-shadow`. **Absolute ban.** This system reads depth through flat surface stacking only; a shadow immediately turns it into a generic dashboard.
- **Don't** build a light mode. Remedium is dark-only by design; there is no toggle and no plan for one.
- **Don't** use a fully rounded / pill radius anywhere (buttons, badges, avatars). The system caps at 6px (cards) and 3px (badges) — never higher, never fully circular except literal icon glyphs.
- **Don't** reuse a faction hue (red/blue/green) to mean a UI status (error/success/info) or vice versa. Status colors and faction colors happen to share some values by coincidence, not by design; keep the contexts separate in your head even when the hex matches.
- **Don't** apply a saturated solid-color fill as a background for any tag, card, or section. Every colored surface goes through the dim-alpha formula.
- **Don't** use side-stripe colored borders on generic cards. That treatment is reserved exclusively for callout boxes (tip/warn/info) and tier-block headers — using it elsewhere dilutes its meaning as "this is advice" or "this is a ranked tier."
- **Don't** put body prose in Share Tech Mono. Mono is for labels, numbers, and short tags only; anything longer than a short phrase belongs in Barlow.
- **Don't** center the design around glossy game-UI chrome (ornate borders, gem bevels, glowing rings). Remedium is a flat ops console, not a fantasy-game HUD.
- **Don't** add a top-level "Motion" or "Responsive" section beyond what's covered here — keep the spec to these six sections.
