const textEl = document.getElementById('text')
const titleList = [
  'a Front End Especialist',
  'a Christhian Developer',
  'a Problem Solver',
  'the Developer you need!',
]
let titleIdx = 0
let idx = 1
let speed = 300 / 10
let valor = 1

writeText()

function writeText() {
  textEl.innerText = titleList[titleIdx].slice(0, idx)
  let text = titleList[titleIdx]
  idx = idx + valor
  if(idx == 0) {
    valor = +1
    titleIdx++
    if(titleIdx > text.length) {
      titleIdx = 0
    }
  }
  if(idx > text.length) {
    valor = -1
    setTimeout(writeText, speed + 1000)
  } else {
    setTimeout(writeText, speed)
  }
  
}

speedEl.addEventListener('input', (e) => speed = 300 / e.target.value)