const btns = document.querySelectorAll('button')
const btns2 = document.querySelectorAll('button')

console.log(btns)
console.log(btns2)


btns2.forEach(btn => {
    btn.addEventListener('click', event => {
        if(event.target.localName == 'i') {
            event.target.parentNode.parentNode.classList.toggle('active')
        } else {
            event.target.parentNode.classList.toggle('active')
        }
        
    })
})

/*
btns.forEach(btn => {
    btn.addEventListener('click', event => {
        event.target.parentNode.classList.toggle('active')
        console.log(event.target)
    })
})
*/