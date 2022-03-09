const cards = document.querySelectorAll('.card')
const lstProjectsCookie = getCookie('lstProjectsCookie')
console.log(lstProjectsCookie, 'lstProjectsCookie')
setCookie(lstProjectsCookie, lstProjectsCookie + '1', 365)


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    setCookie('lstProjectsCookie', '', 0)
    removeChecks()
}

function removeChecks() {
    const iconsOfVisitedCards = document.querySelectorAll('.visited')
    iconsOfVisitedCards.forEach((icon) => {
        icon.classList.remove('visited')
    })
}

if(lstProjectsCookie == '') {
    lstProjects = []
} else {
    lstProjects = lstProjectsCookie.split(',')
    console.log(lstProjects, 'lstProjects')
}

cards.forEach((card) => {
    if(lstProjects.indexOf(card.querySelector('.number').innerText) != -1) {
        card.querySelector('i').classList.add('visited')
    }
})

function addItem(item) {
    if(lstProjects.indexOf(item) == -1) {
        const actualList = getCookie('lstProjectsCookie')
        if(lstProjects.length == 0) {
            setCookie('lstProjectsCookie', item, 365)

        } else {
            setCookie('lstProjectsCookie', actualList + ',' + item, 365)
        }
        lstProjects.push(item)
        cards.forEach((card) => {
            if(card.querySelector('.number').innerText == item) {
                card.querySelector('i').classList.add('visited')
            }
        })
    }
}
cards.forEach((card) => {
    card.addEventListener('click', (e) => {
        e.preventDefault()
        addItem(card.querySelector('.number').innerText)
        console.log(e)
        if(e.target.localName == 'a') {
            window.location.href = e.target.href
        } else {
            const card = e.target.offsetParent
            window.location.href = card.href
        }

    })
})