// Single source of truth for service-page metadata — the service-page
// equivalent of src/blog/posts.js. The compile task (tasks/service.js) iterates
// THIS array and compiles only the slugs listed here; it does NOT glob
// src/services/*.pug (a blind glob would pick up inert, layout-less fragments
// like water-damage-restoration-sydney.pug and emit a broken page).
//
// TO PUBLISH A PAGE: set its `published` to an ISO date string (YYYY-MM-DD).
// Until then leave it null — an unpublished page is NOT copied to docs/ and is
// NOT in the sitemap (same gating as the blog). published:null = not on the
// internet, not merely unadvertised.
//
// PAGE IMAGE (optional hero): set `image` to a filename living at
// src/img/services/<image> and `alt` to its alt text. `alt` is REQUIRED
// whenever `image` is set — the build fails loudly otherwise (mirrors blog.js).
// An unpublished page's image is not shipped to docs/ either.
//
// `faq` is an array of { q, a } objects. It is the SINGLE source for BOTH the
// visible FAQ accordion AND the FAQPage JSON-LD, so the two can never drift.
// Keep it water-damage only — the excluded-topic FAQ (see shared guardrails)
// lives solely in the sanctioned landing-page carve-out (components/faq.pug),
// which this pipeline deliberately does NOT reuse.
module.exports = [
  {
    "slug": "emergency-water-damage-restoration-sydney",
    "title": "Emergency Water Damage Restoration Sydney | Book Online — drySafe",
    "description": "Emergency water damage restoration across Sydney — self-serve online booking, extraction and proper drying, verified with moisture readings and documented for your insurer. Book & pay online.",
    "published": null,
    "image": null,
    "alt": null,
    "faq": [
      {
        "q": "How fast can drying start?",
        "a": "drySafe is fully self-serve, so there's no callback or quote to wait on — you book and pay online, it's confirmed on the spot, and the drying equipment gets on site sooner. In an emergency, that saved time is what protects the most."
      },
      {
        "q": "How long does drying take?",
        "a": "It depends on how much water there was, how far it soaked, and the materials involved — a light soak dries quickly, while a saturated timber floor or concrete slab takes longer. The job is finished when moisture readings confirm the home is back to its normal dry standard, not just dry to the touch."
      },
      {
        "q": "Do I need to leave home during the work?",
        "a": "In most cases, no. The drying equipment runs while you go about your day. If it's safer to relocate for a while, let drySafe know so it can be coordinated around you."
      },
      {
        "q": "Can you document the job for my insurer?",
        "a": "Yes. drySafe records moisture readings and photos through the dry-down, so you have a documented result for your own records and to share with your insurer."
      }
    ]
  },
  {
    "slug": "example-service",
    "title": "Example Service Page (template stub) — drySafe",
    "description": "Template proof page for the drySafe service-page pipeline. Not real content and not for publishing — wired published:null to demonstrate the Service Page Standard.",
    "published": null,
    "image": null,
    "alt": null,
    "faq": [
      {
        "q": "How soon can drying start?",
        "a": "drySafe is fully self-serve, so you book and pay online in a few minutes and drying can be underway quickly — the sooner it starts, the more of the home and belongings come through."
      },
      {
        "q": "How long does drying take?",
        "a": "It depends on how much water there was, how deep it soaked, and the materials involved — a light soak is quick, while a saturated timber floor or concrete slab takes longer. The job is finished when moisture readings confirm the home is back to its normal dry standard."
      },
      {
        "q": "Do I need to leave home during the work?",
        "a": "In most cases, no. The equipment runs while you go about your day. If it's safer to relocate temporarily, let drySafe know so it can be coordinated."
      },
      {
        "q": "Can you provide documentation for my insurer?",
        "a": "Yes — drySafe can provide photos and moisture readings documenting the dry-down for your records and your insurer."
      }
    ]
  }
];
