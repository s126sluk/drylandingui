export default function () {
    const header = document.querySelector('.header')
    const burger = document.querySelector('.js-burger')

	if (!header) return

    burger.addEventListener('click', function (e) {
        document.documentElement.classList.toggle('open-menu')
		e.currentTarget.setAttribute('aria-expanded', !(e.currentTarget.getAttribute('aria-expanded') === 'true' ? true : false))
    })

    header.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            document.documentElement.classList.remove('open-menu')
			burger.setAttribute('aria-expanded', !(burger.getAttribute('aria-expanded') === 'true' ? true : false))
        }
    })

    let linkNav = document.querySelectorAll('[href^="#"]')
	let headerHeight = 0
	// let headerHeight = header.getBoundingClientRect().height
	let V = 0.2;
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) {
			e.preventDefault();
			let w = window.pageYOffset 
			let hash = this.href.replace(/[^#]*(.*)/, '$1');
			let tar = document.querySelector(hash) 
			let t = tar.getBoundingClientRect().top - headerHeight
			let start = null;

			requestAnimationFrame(step); 
			function step(time) {
				if (start === null) {
					start = time;
				}
				var progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash 
				}
			}
			if (t > 1 || t < -1) {
				requestAnimationFrame(step)
			}
		});





        // gsap.to(".logo span", {
        //     opacity: 0.3,
        //     duration: 0.1,
        //     repeat: 5,
        //     yoyo: true,
        //     ease: "power1.inOut",
        //     onComplete: function() {
        //         gsap.to(".logo span", { opacity: 1, duration: 0.5 });
        //     }
        // });
	}
}