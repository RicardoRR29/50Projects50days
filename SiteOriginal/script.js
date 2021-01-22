const nav = document.querySelector('.nav')
window.addEventListener('scroll', changeNav)
setTimeout(showWhatsapp,3000)



const frases = ["Organização da tomada de decisão", "Desconhecimento do próximo salto de negócio", "Dificuldade de crescimento", "Expansão de mercado", "Perda de mercado"] 
const cards = document.querySelectorAll('.big-card')
const titles = document.querySelectorAll('.big-card-title')


selectedPhrases(1)


console.log()
cards[0].addEventListener('click', goCardLeft)
cards[2].addEventListener('click', goCardRight)
console.log(frases.length)

function selectedPhrases(num){

    let i = num
    
    

    titles.forEach(title => {
        if(i > frases.length - 1) 
        {
            i = 0
        } else if (i < 0) {
            i = frases.length - 1
        }


        title.innerText = frases[i]
        i++
    })
}

function goCardLeft() {
    console.log('esquerda', frases.indexOf(titles[0].innerText) - 1)
    selectedPhrases(frases.indexOf(titles[0].innerText) -1)
    
    
}

function goCardRight() {
    console.log('direita',frases.indexOf(titles[1].innerText))
    selectedPhrases(frases.indexOf(titles[1].innerText))

}

function changeNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}

function mandarMensagem() {
    window.open('https://api.whatsapp.com/send?phone=5527992868233&text=Bom%20dia%2C%20gostaria%20de%20perguntar%20sobre%20a%20empresa.', '_blank')
}

function showWhatsapp() {
    wp = document.getElementById('wp')
    wp.style.display = 'block'
    wp.addEventListener('click', mandarMensagem)
}

