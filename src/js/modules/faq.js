export default function () {
    let items = document.querySelectorAll('.question')
    let activeItem = document.querySelector('.question.active')
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function (e) {
            if (e.currentTarget !== activeItem && !!activeItem) {
                activeItem.classList.remove('active')
            }
            if (e.currentTarget.classList.contains('active')) {
                e.currentTarget.classList.remove('active')
            } else {
                e.currentTarget.classList.add('active')
                activeItem = e.currentTarget
            }
        })
    }
}