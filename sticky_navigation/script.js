const nav = document.querySelector('.nav')
window.addEventListener('scroll', changeNav)

function changeNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}