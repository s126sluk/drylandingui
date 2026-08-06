// Single source of truth for blog post metadata. The blog index and each
// post's <head> are generated from this array — there is no hard-coded list.
//
// TO PUBLISH A POST: set its `published` to an ISO date string (YYYY-MM-DD),
// e.g. "2026-08-06". Until then leave it null — an unpublished post does NOT
// appear in the blog index or sitemap, and is NOT copied to docs/ (not shipped).
//
// TO ADD A POST IMAGE: set `image` to a filename and `alt` to its alt text.
//   - The file lives at src/img/blog/<image> — a 16:9 JPG supplied at 2400x1350.
//   - `alt` is REQUIRED whenever `image` is set; the build fails loudly otherwise.
//   - Optimise it first (lossy source-prep, fixed JPG quality 82 -> ~200-300KB):
//       djpeg -pnm in.jpg | cjpeg -quality 82 -progressive -optimize > src/img/blog/<image>
//   - An unpublished post's image is NOT shipped to docs/ (same gating as the post).
//   - Leave image/alt null for a post with no image — it renders normally.
module.exports = [
  {
    "slug": "wet-carpet-drying-guide",
    "title": "Wet Carpet Drying: How Long It Takes & How to Save Your Carpet",
    "description": "Soaked carpet? How professional wet carpet drying works, realistic timelines by damage class, and when a carpet can be saved. Book & pay online.",
    "published": "2026-08-06",
    "image": "wet-carpet-drying-guide.jpg",
    "alt": "A large wet patch spread across pale living-room carpet after a water leak"
  },
  {
    "slug": "how-to-dry-wet-carpet",
    "title": "How to Dry Wet Carpet: A Step-by-Step Guide",
    "description": "How to dry a wet carpet after a leak or flood — extract first, get air moving, and how to tell when it's a job for professional drying gear. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "dry-wet-carpet",
    "title": "Can You Dry a Wet Carpet Yourself? When DIY Works and When It Doesn't",
    "description": "Drying a wet carpet — when you can safely do it yourself and when it's a job for proper drying. The DIY threshold, the water you can't see, and how to be sure. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "carpet-flood-damage",
    "title": "Carpet Flood Damage: What Floodwater Does & What Can Be Saved",
    "description": "Floodwater is dirtier and spreads further than a burst pipe. What flood damage does to carpet, underlay and subfloor — and how to tell what's salvageable. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "water-damage",
    "title": "Water Damage: A Homeowner's Guide — Types, First Steps & When to Get Help",
    "description": "What causes water damage, why it spreads further than it looks, the three water categories, what to do first, and when it's a job for proper drying. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "emergency-water-damage",
    "title": "Emergency Water Damage: What to Do in the First Minutes",
    "description": "Water actively causing damage? A calm, fast playbook — make it safe, stop the water, slow the damage, and know when it's a real emergency. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "fixing-water-damage",
    "title": "Fixing Water Damage: What It Actually Takes to Put It Right",
    "description": "Fixing water damage starts with drying, not patching. What repair really involves, what you can DIY, and why doing it in the right order stops you doing it twice. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "house-flooded-what-to-expect",
    "title": "My House Flooded — What to Expect From the Recovery",
    "description": "Your house flooded — now what? The realistic recovery arc: assessment, proper drying, repairs and how long it takes. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "ceiling-water-damage",
    "title": "Ceiling Water Damage: Causes, Risks & What to Do",
    "description": "What ceiling water damage is, its common causes, the risks (electrics, sagging plaster, hidden moisture), and why proper drying comes before any repair. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "ceiling-leak",
    "title": "Ceiling Leak: What to Do When Water's Coming Through",
    "description": "Water leaking from your ceiling? The safe order to deal with it — electrics, sagging plaster, containing the water, finding the source, and why proper drying comes before repair. Book online.",
    "published": null,
    "image": null,
    "alt": null
  },
  {
    "slug": "water-stain-on-ceiling",
    "title": "What a Water Stain on Your Ceiling Actually Means",
    "description": "How to read a ceiling water stain — active vs old, what the colour, shape and spread tell you, why a dry-looking stain can still be wet, and when it needs proper drying before repainting. Book online.",
    "published": null,
    "image": null,
    "alt": null
  }
];
