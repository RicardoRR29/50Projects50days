const cards = document.querySelectorAll('.card')
const lstProjectsCookie = getCookie('lstProjectsCookie')

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
    stopConfetti()
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
}

cards.forEach((card) => {
    if(lstProjects.indexOf(card.querySelector('.number').innerText) != -1) {
        card.querySelector('i').classList.add('visited')
    }
})

function addItem(item) {
    let href = ''
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
                href = card.href
            }
        })
    } else {
        cards.forEach((card) => {
            if(card.querySelector('.number').innerText == item) {
                card.querySelector('i').classList.add('visited')
                href = card.href
            }
        })
    }
    window.open(href, '_blank');

}
cards.forEach((card) => {
    card.addEventListener('click', (e) => {
        e.preventDefault()
        verifyStatus()
        addItem(card.querySelector('.number').innerText)
    })
})
if (navigator.userAgent.indexOf("WOW64") != -1 || 
    navigator.userAgent.indexOf("Win64") != -1 ){
    var maxParticleCount = 100; //set max confetti count
} else {
    var maxParticleCount = 50; //set max confetti count
}
var particleSpeed = 1; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

startConfetti = startConfettiInner;
stopConfetti = stopConfettiInner;
toggleConfetti = toggleConfettiInner;
removeConfetti = removeConfettiInner;
var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
var streamingConfetti = false;
var animationTimer = null;
var particles = [];
var waveAngle = 0;

function resetParticle(particle, width, height) {
	particle.color = colors[(Math.random() * colors.length) | 0];
	particle.x = Math.random() * width;
	particle.y = Math.random() * height - height;
	particle.diameter = Math.random() * 10 + 5;
	particle.tilt = Math.random() * 10 - 10;
	particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
	particle.tiltAngle = 0;
	return particle;
}

function startConfettiInner() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				return window.setTimeout(callback, 16.6666667);
			};
	})();
	var canvas = document.getElementById("confetti-canvas");
	if (canvas === null) {
		canvas = document.createElement("canvas");
		canvas.setAttribute("id", "confetti-canvas");
		canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
		document.body.appendChild(canvas);
		canvas.width = width;
		canvas.height = height;
		window.addEventListener("resize", function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}, true);
	}
	var context = canvas.getContext("2d");
	while (particles.length < maxParticleCount)
		particles.push(resetParticle({}, width, height));
	streamingConfetti = true;
	if (animationTimer === null) {
		(function runAnimation() {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			if (particles.length === 0)
				animationTimer = null;
			else {
				updateParticles();
				drawParticles(context);
				animationTimer = requestAnimFrame(runAnimation);
			}
		})();
	}
}

function stopConfettiInner() {
	streamingConfetti = false;
}

function removeConfettiInner() {
	stopConfetti();
	particles = [];
}

function toggleConfettiInner() {
	if (streamingConfetti)
		stopConfettiInner();
	else
		startConfettiInner();
}

function drawParticles(context) {
	var particle;
	var x;
	for (var i = 0; i < particles.length; i++) {
		particle = particles[i];
		context.beginPath();
		context.lineWidth = particle.diameter;
		context.strokeStyle = particle.color;
		x = particle.x + particle.tilt;
		context.moveTo(x + particle.diameter / 2, particle.y);
		context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
		context.stroke();
	}
}

function updateParticles() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	var particle;
	waveAngle += 0.01;
	for (var i = 0; i < particles.length; i++) {
		particle = particles[i];
		if (!streamingConfetti && particle.y < -15)
			particle.y = height + 100;
		else {
			particle.tiltAngle += particle.tiltAngleIncrement;
			particle.x += Math.sin(waveAngle);
			particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
			particle.tilt = Math.sin(particle.tiltAngle) * 15;
		}
		if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
			if (streamingConfetti && particles.length <= maxParticleCount)
				resetParticle(particle, width, height);
			else {
				particles.splice(i, 1);
				i--;
			}
		}
	}
}

function verifyStatus() {
    let count = 0
    cards.forEach(card => {
        if(card.querySelector('.fa-solid').classList.contains('visited')) {
            count++
        }
    })
    console.log(count)
    if(count > 3) {
        startConfetti()
    }
}
verifyStatus()
