let currentSectionId = "start"
let time = 31;
let timeEl = document.querySelector("#timeVal")
let startBtn = document.querySelector(".start-btn")
let score = 1
let scoreEl = document.querySelector("#score")

let creeper = document.createElement("img")
creeper.src = "creeper.png"
creeper.className = "creeper"
let blocks = document.querySelectorAll(".block")

//switching screen function
function switchScreen(nextSectionId) {
    document.getElementById(currentSectionId).hidden = true
    document.getElementById(nextSectionId).hidden = false;
    currentSectionId = nextSectionId;
}

//spawning creeper 
function spawnCreeper() {
    let randomBlock = blocks[Math.floor(Math.random() * 9)]
    randomBlock.append(creeper)

    setTimeout(function() {
        randomBlock.classList.add("up")
    }, 50)

    setTimeout(function() {
        randomBlock.classList.remove("up")
    }, 800)
}

// add score when creeper is pressed
creeper.addEventListener("click", function() {
    scoreEl.textContent = score++
}) 

//timer function including the timer and how much 
// time the creeper will spawn
function startTimer() {
    let timer = setInterval(function(){
        time--
        timeEl.textContent = time

        if (time === 0) {
            clearInterval(timer)
            clearInterval(creeperTime)
            switchScreen('end')
        }
    },1000)

    let creeperTime = setInterval(function() {
                        spawnCreeper()
                    },1200)
}
