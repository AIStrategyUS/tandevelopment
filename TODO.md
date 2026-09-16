# TODO before launch

The portfolio now holds only the three real Edwards Avenue projects. Every fictional placeholder project, and every placeholder image on the site, has been removed. What's left below are open facts to confirm on real content, plus a couple of sections that were dropped entirely because no suitable real content was available.

## Real Edwards Avenue projects - confirm before launch

Three projects, all neighborhood "Inglewood": `3819-edwards`, `3827-edwards`, `3829-edwards`.

**3819 Edwards** (`src/data/projects/3819-edwards.md`, status Sold) - built from the real Zillow/MLS listing for 3819B Edwards Ave (MLS #3245113). Specs (2,340 sqft, 4 bed, 4.5 bath, built 2026) are real, pulled from the listing's Facts & Features. Two things to confirm before this goes live:
1. **Photo rights.** The 5 photos in `public/images/projects/3819-edwards/` were downloaded directly from the Zillow listing. These are professional real estate photos, almost certainly shot by a photographer working for the listing brokerage (Compass RE / Carletello & Co.), not by Sebastian. Building the home does not automatically confer rights to reuse the listing photos on a separate commercial site. Confirm usage rights with Tony Carletello (or get replacement photos taken directly) before launch.
2. **Status nuance.** Zillow currently shows this listing as "Under contract - showing" (contingent, accepted offer, not yet closed) rather than fully sold. I mapped that to "Sold" for the portfolio since it's no longer actively available to new buyers, but flip it back to "Available" if the deal falls through, or hold off until it actually closes if you'd rather be precise.

**3827 Edwards** and **3829 Edwards** (status Under Construction) - built from two Amna Design finish-selection decks (`tan-development projects/Amna Design - Tan Development - 3827.pdf` and `...3829.pdf`), not from real estate listings. Real facts used: the exact address (stated in both documents), exterior materials, interior finish specs (paint colors, stone, fixtures - see each PDF for the full spec sheet), and square footage (2,600 sqft each, confirmed). Two things are **not** in either document and still need to be confirmed against the actual plans:
1. **Bed/bath count** - I inferred 4 bed / 4.5 bath for both from the room list (1 primary + 3 guest baths + 1 powder in each deck), but this is an inference, not a stated fact. Confirm against the actual plans.
2. **Neighborhood** - neither document names a neighborhood. I assumed "Inglewood" since both addresses are on the same short stretch of Edwards Ave as the confirmed-Inglewood 3819 listing. Very likely correct, but not explicitly confirmed.
3. The gallery images on both project pages are **photorealistic renderings from the design deck, not construction photos** - the pages already carry a visible "Renderings shown" note (see `src/pages/portfolio/[slug].astro`) since both stages are pre-construction, but replace them with real photos once each home is built.

## Process page photos (real renderings, reused from the design decks)

`src/pages/process/index.astro` now shows two real renderings from the Amna Design decks: the 3827 Edwards exterior twilight rendering under "Land & Design," and the 3829 Edwards kitchen rendering under "Build." Both carry a visible caption saying they're renderings from a current project, not documentary progress photos of that specific stage. Two things worth deciding:
1. Once real job-site progress photos exist (a site walk for Land & Design, a framing walkthrough for Build), swap these renderings out for the real thing.
2. Stages 02 (Pre-Construction) and 04 (Delivery) still have no photo at all. Worth adding one for each once real photos exist, but I didn't force in mismatched renderings just to fill the slot.

## Removed - no suitable content was available

Two things the build brief called for were dropped entirely rather than filled with something misleading:

1. **Home page Instagram strip.** I checked Sebastian's Instagram (@sebastian_tan01) directly. Of what's accessible without logging in, one photo was a genuinely clean, professional home exterior shot (posted by Carletello & Co.); everything else was either personal/family content, an unrelated event photo, or a Reel cover with bold graphic text baked into the image (not clean architectural photography, and a bad fit for a quiet editorial grid). That's nowhere near six usable tiles, so the section is gone rather than half-filled with mismatched content. If you want to revisit this, the best path is probably just asking Sebastian directly for 6 real exterior/interior photos rather than scraping the feed.
2. **About page portrait.** The only accessible solo photo of Sebastian was his Instagram profile picture, and it turned out to be a stylized retro "Miami 1986" filter photo (sunglasses, feathered hair, palm trees), not a genuine current photo, on top of being served at only 150x150px. There's no way to turn that into an honest "professional headshot," and no real photo generation tool is available to fabricate one. The About page bio is now a single centered text column with no portrait. Add a real photo of Sebastian whenever one exists (see `src/pages/about/index.astro`, the `.about-intro__text` block, for where to reintroduce an image column).

## Sebastian's About bio

`src/pages/about/index.astro` currently carries a generic, invented bio (three paragraphs about staying close to the job site, why he builds in Nashville, and what matters to him on a build, plus a pull quote). None of it is drawn from anything Sebastian actually told us. It reads fine as placeholder copy, but it needs real biographical detail before launch: how he actually got into building, what he actually did before this, how long he has actually been building in Nashville, and a pull quote that is something he actually said.

## Contact page hours

`src/pages/contact/index.astro` lists the Hours field as "By appointment," a placeholder. Confirm with Sebastian what the real hours (or scheduling approach) should say before launch.

## Cloudflare Worker (related, not a copy issue)

Not fictional content, but also not launch-ready: the Worker at `https://solitary-violet-297c.aistrategyus.workers.dev` needs to be updated to log the new `projectType` field the contact form now sends. See README.md for detail.
