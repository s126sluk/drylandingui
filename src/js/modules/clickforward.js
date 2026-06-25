// Hop 0 of the gclid attribution spine + WCR numerator.
//
// Google auto-tagging lands visitors on this page with ?gclid=… (or
// ?gbraid=/?wbraid= for iOS/Safari traffic). The funnel (drysafecp1) reads
// these on its entry route, but only if they survive the cross-domain hop.
// So on load we copy any present click ids onto every CTA that points at the
// funnel, turning .../  into .../?gclid=…
//
// We also fire the WCR numerator (`cta_clickthrough`) on the SAME click that
// forwards to the funnel — one atomic action with the gclid that was appended.
// WCR = cta_clickthrough ÷ landing_pageview, both captured on drysafe.sydney.
//
// Forwards ONLY gclid/gbraid/wbraid — that's all the funnel reads.

const CLICK_PARAMS = ['gclid', 'gbraid', 'wbraid'];

export default function () {
    let incoming;
    try {
        incoming = new URLSearchParams(window.location.search);
    } catch (e) {
        incoming = new URLSearchParams();
    }

    // Collect only present, non-empty click ids (paid traffic). Organic = none.
    const present = [];
    for (const name of CLICK_PARAMS) {
        const value = (incoming.get(name) || '').trim();
        if (value) present.push([name, value]);
    }

    const links = document.querySelectorAll('a[href*="drysafe.vercel.app"]');
    links.forEach(function (link) {
        // Append click ids to the href so they survive the cross-domain hop.
        if (present.length > 0) {
            try {
                const url = new URL(link.href);
                for (const [name, value] of present) {
                    url.searchParams.set(name, value);
                }
                link.href = url.toString();
            } catch (e) {
                /* malformed href — skip the append, still wire the event below */
            }
        }

        // WCR numerator: fire on the click that forwards to the funnel. Fired
        // for EVERY funnel CTA click (organic included) so the ratio is honest;
        // click ids are null for organic. Guarded so a missing/slow PostHog
        // never blocks navigation.
        link.addEventListener('click', function () {
            try {
                if (window.posthog && typeof window.posthog.capture === 'function') {
                    window.posthog.capture('cta_clickthrough', {
                        destination: link.href,
                        gclid: incoming.get('gclid') || null,
                        gbraid: incoming.get('gbraid') || null,
                        wbraid: incoming.get('wbraid') || null,
                    });
                }
            } catch (e) {
                /* never let analytics break the click-through */
            }
        });
    });
}
