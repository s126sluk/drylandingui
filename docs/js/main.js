(function () {
    'use strict';

    function reviews () {
      let reviewsSwiper = new Swiper(".reviews-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 2
          },
          1200: {
            slidesPerView: 3
          },
          1540: {
            slidesPerView: 4,
            spaceBetween: 24
          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }

    function accordion () {
      let accordions = document.querySelectorAll('.accordion');

      for (let a = 0; a < accordions.length; a++) {
        let items = accordions[a].querySelectorAll('.accordion-item');
        let activeItem = accordions[a].querySelector('.accordion-item.active');

        for (let i = 0; i < items.length; i++) {
          items[i].addEventListener('click', function (e) {
            let button = e.currentTarget.querySelector('.accordion-item__btn');

            if (e.currentTarget !== activeItem && !!activeItem) {
              activeItem.classList.remove('active');
              button.setAttribute('aria-expanded', false);
            }

            if (e.currentTarget.classList.contains('active')) {
              e.currentTarget.classList.remove('active');
              button.setAttribute('aria-expanded', false);
            } else {
              e.currentTarget.classList.add('active');
              button.setAttribute('aria-expanded', true);
              activeItem = e.currentTarget;
            }
          });
        }
      }
    }

    function history () {
      const video = document.querySelector(".video");
      const play = document.querySelector(".video__play");
      if (!video || !play) return;
      const videoId = video.dataset.id;
      const vimeoHash = "7e4b7653d3"; // статический hash

      play.addEventListener("click", () => {
        video.innerHTML = `
      <iframe
        src="https://player.vimeo.com/video/${videoId}?h=${vimeoHash}&autoplay=1&muted=1"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
      ></iframe>
    `;
      });
    }

    function gallery () {
      let gallerySwiper = new Swiper(".gallery-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }

    function notification () {
      // ── Refresh counter (legacy — currently no counter elements in DOM) ──
      const counters = document.querySelectorAll(".notification__refresh span");

      if (counters.length) {
        let timeLeft = 59;

        const updateCounters = () => {
          counters.forEach(counter => {
            counter.textContent = timeLeft;
          });
        };

        updateCounters();
        setInterval(() => {
          timeLeft--;

          if (timeLeft < 1) {
            timeLeft = 59;
          }

          updateCounters();
        }, 1000);
      } // ── Sticky header scroll shadow ──


      const siteHeader = document.querySelector('.site-header');

      if (siteHeader) {
        const onScroll = () => {
          if (window.scrollY > 10) {
            siteHeader.classList.add('is-scrolled');
          } else {
            siteHeader.classList.remove('is-scrolled');
          }
        };

        window.addEventListener('scroll', onScroll, {
          passive: true
        });
        onScroll(); // initial check
      }
    }

    // import header from './modules/header'
    document.addEventListener('DOMContentLoaded', function () {
      // header()
      reviews();
      accordion();
      history();
      gallery();
      notification(); // AOS.init({
      // 	offset: 80,
      // 	duration: 200,
      // 	easing: 'ease-in',
      // 	once: true,
      // });
    });

}());
