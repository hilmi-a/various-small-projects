// function test() {
//     alert("working");
// }

var buttonColors = ["green", "red", "yellow", "blue"],
    gamePattern = [],
    userClickedPattern = []
started = false
level = 0;

$(document).keydown(function () {
    if (!started) {
        nextSequence();
        started = true;
        $("#level-title").text("Level " + level);
    }
});

// if(started){
//     
// }


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var rand = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[rand];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(250).fadeIn(250);

    playSound(randomChoosenColor);
    
    //return randomChoosenColor;
};

$(".btn").click(function () {
    var userChoosenColor = this.id;

    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
});


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 200);

}

function checkAnswer(currentLevel) {
    console.log(currentLevel);
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over press any key to Restart");
        startOver();
    }
    if(gamePattern.length===userClickedPattern.length){
        setTimeout(function () {
            nextSequence();
        }, 1000)
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}