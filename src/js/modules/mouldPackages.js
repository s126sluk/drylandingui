// [CP4 v5-spec, 11 Aug] Package picker + shared order modal.
// Locked behaviours (cp4_handoff_2026-08-11_landing-modal-v5-spec):
//  1. Any picker Select opens the modal showing BOTH packages, the clicked one
//     highlighted; the customer can switch inside the modal.
//  2. The header Book Now ([data-mpk-open]) is a pure modal trigger with
//     drySafe Care preselected.
//  3. Rooms stepper reinstated; COUNT derives the tier (room-SIZE stays dead):
//     1 room = single rate · 2–3 rooms = per-room 2–3 rate · 4+ = per-room 4+.
// Hand-off adds rooms=<N> to the funnel deep-link. Upsells stay post-payment
// in the funnel — never on the landing page. Guarded: inert on water pages.
//
// RATES: approved master-sheet mould tab, ex GST, per room — swappable
// constants pending the post-refinement price confirmation (Care composition
// changed 10 Aug). SRL is dropped for mould per the spec default.

const RATES = {
	basic: { single: 425, two_three: 387, four_plus: 445 },
	care:  { single: 590, two_three: 552, four_plus: 610 },
}
const PKG_LABEL = { basic: 'Basic Savings (Mould)', care: 'drySafe Care (Mould)' }
const FUNNEL = 'https://drysafe.vercel.app/get-started'
const MAX_ROOMS = 8

export function rateFor(pkg, rooms) {
	const t = RATES[pkg]
	if (rooms <= 1) return t.single
	if (rooms <= 3) return t.two_three
	return t.four_plus
}

export default function mouldPackages() {
	const roots = Array.from(document.querySelectorAll('[data-mpk-picker]'))
	const modal = document.querySelector('.mpk-modal')
	if (!roots.length || !modal) return

	const state = { pkg: 'care', rooms: 1 }
	const money = (n) => '$' + n.toLocaleString('en-AU')
	const q = (sel) => modal.querySelector(sel)

	function paintModal() {
		modal.querySelectorAll('[data-pkg]').forEach((b) => {
			const on = b.dataset.pkg === state.pkg
			b.classList.toggle('is-selected', on)
			b.setAttribute('aria-pressed', String(on))
		})
		q('[data-modal="count"]').textContent = state.rooms
		const rate = rateFor(state.pkg, state.rooms)
		const total = rate * state.rooms
		q('[data-modal="mathline"]').textContent =
			`${state.rooms} room${state.rooms === 1 ? '' : 's'} × ${money(rate)} = ${money(total)} + GST`
		q('[data-modal="total"]').textContent = money(total) + ' + GST'
	}

	function openModal(pkg) {
		state.pkg = pkg
		paintModal()
		modal.hidden = false
		document.body.style.overflow = 'hidden'
	}

	// 1. Picker Select buttons → modal, clicked package highlighted
	roots.forEach((root) =>
		root.querySelectorAll('[data-select]').forEach((btn) =>
			btn.addEventListener('click', () => openModal(btn.dataset.select))))

	// 2. Header Book Now → modal, Care preselected (anchor fallback without JS)
	document.querySelectorAll('[data-mpk-open]').forEach((el) =>
		el.addEventListener('click', (e) => {
			e.preventDefault()
			openModal(el.dataset.mpkOpen || 'care')
		}))

	// Switch package inside the modal
	modal.querySelectorAll('[data-pkg]').forEach((btn) =>
		btn.addEventListener('click', () => {
			state.pkg = btn.dataset.pkg
			paintModal()
		}))

	// 3. Rooms stepper — count drives the tier
	modal.querySelectorAll('[data-step]').forEach((btn) =>
		btn.addEventListener('click', () => {
			state.rooms = Math.min(MAX_ROOMS, Math.max(1, state.rooms + Number(btn.dataset.step)))
			paintModal()
		}))

	modal.querySelectorAll('[data-close]').forEach((el) =>
		el.addEventListener('click', () => {
			modal.hidden = true
			document.body.style.overflow = ''
		}))

	// Hand-off: funnel deep-link with package + rooms + details prefilled.
	// Funnel-side consumption is a separate CP4 work order.
	modal.querySelector('.mpk-modal__form').addEventListener('submit', (e) => {
		e.preventDefault()
		const form = e.target
		if (!form.reportValidity()) return
		const params = new URLSearchParams({
			service: 'mould',
			package: state.pkg,
			rooms: String(state.rooms),
			name: form.name.value,
			phone: form.phone.value,
			email: form.email.value,
			address: form.address.value,
		})
		const dest = `${FUNNEL}?${params.toString()}`
		if (window.__CP4_PREVIEW) {
			const notice = modal.querySelector('.mpk-modal__notice')
			notice.hidden = false
			notice.textContent =
				'Preview only — in production this continues to the funnel with everything prefilled: ' + dest
			return
		}
		window.location.href = dest
	})

	paintModal()
}
