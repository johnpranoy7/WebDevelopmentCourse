var gameSequence = [];
var userClickPattern = [];
var level = 0;
let gameStarted = false;
var colors = ['Green', 'Red', 'Yellow', 'Blue'];

function newSequence() {
    userClickPattern = [];
    let myrand = Math.floor(Math.random() * 4);
    gameSequence.push(colors[myrand].toLowerCase());
    console.log(gameSequence);
    let selectedBtn = colors[myrand].toLowerCase();
    playSound(selectedBtn);
    $("#" + selectedBtn).fadeOut(250).fadeIn(250);
    level++;
    $("h1").text("Level: " + level);
}

$(this).on("keypress", startGame);

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        level = 0;
        $("h1").text("Level: " + level);
        newSequence();
    }
}

$(".btn").on("click", function () {
    let selectedColor = $(this).attr("id");
    userClickPattern.push(selectedColor);
    playSound(selectedColor);
    animatePress(selectedColor);
    if (compareResults(userClickPattern.length - 1)) {
        if (userClickPattern.length == gameSequence.length) {
            newSequence();
        }
    }
    else {
        gameEnded();
    }
});

function compareResults(x) {
    if (gameSequence[x] != userClickPattern[x]) {
        return false;
    }
    return true;
}

function gameEnded() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    gameStarted = false;
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    console.log("GAME ENDED");
    resetGame();
}

function resetGame() {
    gameSequence = [];
    userClickPattern = [];
    level = 0;
    gameStarted = false;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () { $("#" + currentColor).removeClass("pressed") }, 100);
}

