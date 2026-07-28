// SMS fallback tracking — `sms_deeplink_tap`.
//
// The SMS panel's action chip is an sms: deeplink, so the tap leaves the page
// for the Messages app and we never see a pageview for it. This is the only
// signal that the fallback path is being used at all, and which of the three
// placements (hero / mid / final) is earning it.
//
// Deliberately separate from clickforward.js: that module owns the
// a[href*="drysafe.vercel.app"] selector and the cta_clickthrough WCR
// numerator, and nothing here touches either. Different selector
// (a.sms-chip[data-sms-placement]), different event, no overlap — an sms:
// href can never match clickforward's substring selector.
//
// `placement` comes from data-sms-placement, set at each +smsPanel() call site.

export default function () {
    const chips = document.querySelectorAll('a.sms-chip[data-sms-placement]');

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            try {
                if (window.posthog && typeof window.posthog.capture === 'function') {
                    window.posthog.capture('sms_deeplink_tap', {
                        placement: chip.getAttribute('data-sms-placement'),
                    });
                }
            } catch (e) {
                /* never let analytics block the deeplink */
            }
        });
    });
}
