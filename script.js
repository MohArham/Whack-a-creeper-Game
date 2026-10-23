let currentSectionId = "start";
let time = 31;
let timeEl = document.querySelector("#timeVal");
let scoreEl = document.querySelector("#score");
let endScore = document.querySelector(".end-score");
let score = 0;
let timer;
let creeperTime;
let spawnTimeout;
let hideTimeout;

let hitSound = new Audio("creeper-hit.mp3");
let backgroundMusic = new Audio("background-music.mp3")
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;
let difficulty = "easy";
let spawnSpeed = 1200

let creeper = document.createElement("img");
creeper.src = "creeper.png";
creeper.className = "creeper";
let blocks = document.querySelectorAll(".block");

// Switch screens
function switchScreen(nextSectionId) {
    document.getElementById(currentSectionId).hidden = true;
    document.getElementById(nextSectionId).hidden = false;
    currentSectionId = nextSectionId;
}

//Change the difficulty
function changeDifficulty(changedDifficulty) {
    difficulty = changedDifficulty
    if (difficulty === "Medium") {
        spawnSpeed = 680
    } else if (difficulty === "Hard"){
        spawnSpeed = 580
        time = 21
    } else {
        spawnSpeed = 1200
    }
}
    

// Spawn a creeper
function spawnCreeper() {
    let randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
    randomBlock.append(creeper);

    spawnTimeout = setTimeout(function() {
        randomBlock.classList.add("up");
    }, 50);
    hideTimeout = setTimeout(function() {
        randomBlock.classList.remove("up");
    }, 800);
}

// Add score when the creeper is clicked
creeper.addEventListener("click", function() {
    score++;
    scoreEl.textContent = score;
    hitSound.currentTime = 0;
    hitSound.play();
});

//Background music
document.addEventListener("click", function startMusic(){
    backgroundMusic.play()
    document.removeEventListener("click", startMusic())
});

// Start the timer and creeper spawning
function startTimer() {
    clearInterval(timer);
    clearInterval(creeperTime);

    timer = setInterval(function() {
        time--;
        timeEl.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            clearInterval(creeperTime);
            clearTimeout(spawnTimeout);
            clearTimeout(hideTimeout);
            time = 0;
            timeEl.textContent = time;
            creeper.classList.remove("up");
            creeper.remove();

            blocks.forEach(function(block) {
                block.classList.remove("up");
            });
            switchScreen("end");
            endScore.textContent = "🏆 " + score;
        }
    }, 1000);

    creeperTime = setInterval(function() {
        spawnCreeper();
    }, spawnSpeed);
}

// Restart the game
function resetGame() {
    clearInterval(timer);
    clearInterval(creeperTime);
    clearTimeout(spawnTimeout);
    clearTimeout(hideTimeout);
    time = 31;
    score = 0;

    timeEl.textContent = time;
    scoreEl.textContent = score;
    endScore.textContent = "🏆 " + score;
    creeper.classList.remove("up");
    creeper.remove();

    blocks.forEach(function(block) {
        block.classList.remove("up");
    });
    switchScreen("input-method");
    startTimer();
}

// Initialize the score display
scoreEl.textContent = score;
timeEl.textContent = time;
endScore.textContent = "🏆 " + score;

// Add sound (for later)
