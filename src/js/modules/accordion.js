export default function () {
    let accordions = document.querySelectorAll('.accordion')

    for(let a = 0; a < accordions.length; a++) {
        let items = accordions[a].querySelectorAll('.accordion-item')
        let activeItem = accordions[a].querySelector('.accordion-item.active')
        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener('click', function (e) {
                let button = e.currentTarget.querySelector('.accordion-item__btn')
                if (e.currentTarget !== activeItem && !!activeItem) {
                    activeItem.classList.remove('active')
                    button.setAttribute('aria-expanded', false)
                }
                if (e.currentTarget.classList.contains('active')) {
                    e.currentTarget.classList.remove('active')
                    button.setAttribute('aria-expanded', false)
                } else {
                    e.currentTarget.classList.add('active')
                    button.setAttribute('aria-expanded', true)
                    activeItem = e.currentTarget
                }
            })
        }
    }

}