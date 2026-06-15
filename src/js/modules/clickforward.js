// Hop 0 of the gclid attribution spine.
//
// Google auto-tagging lands visitors on this page with ?gclid=… (or
// ?gbraid=/?wbraid= for iOS/Safari traffic). The funnel (drysafecp1) reads
// these on its entry route, but only if they survive the cross-domain hop.
// So before the user clicks through, copy any present click ids onto every
// CTA that points at the funnel, turning .../  into .../?gclid=…
//
// Forwards ONLY gclid/gbraid/wbraid — that's all the funnel reads.

const CLICK_PARAMS = ['gclid', 'gbraid', 'wbraid'];

export default function () {
    let incoming;
    try {
        incoming = new URLSearchParams(window.location.search);
    } catch (e) {
        return;
    }

    // Collect only present, non-empty click ids. No-op if none.
    const present = [];
    for (const name of CLICK_PARAMS) {
        const value = (incoming.get(name) || '').trim();
        if (value) present.push([name, value]);
    }
    if (present.length === 0) return;

    const links = document.querySelectorAll('a[href*="drysafe.vercel.app"]');
    links.forEach(function (link) {
        try {
            const url = new URL(link.href);
            for (const [name, value] of present) {
                url.searchParams.set(name, value);
            }
            link.href = url.toString();
        } catch (e) {
            /* malformed href — skip this link, leave the rest untouched */
        }
    });
}
