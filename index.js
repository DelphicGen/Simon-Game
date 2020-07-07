let level = 1;
let gameOver = false;
let randomNumber;
let gamePattern = [];

let green = new Audio("sounds/green.mp3");
let red = new Audio("sounds/red.mp3");
let yellow = new Audio("sounds/yellow.mp3");
let blue = new Audio("sounds/blue.mp3");
let wrong = new Audio("sounds/wrong.mp3");

let nClick = 0;

particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update;


const playSound = (color) => {
    switch(color){
        case "green": green.play();
        break;
        case "red": red.play();
        break;
        case "yellow": yellow.play();
        break;
        case "blue": blue.play();
        break;
        case "wrong": wrong.play();
        break;
        default: console.log(color);
    }
}

const nextSequence = () => {
    randomNumber = Math.floor(Math.random()*4);
    // console.log(randomNumber);
    switch(randomNumber){
        case 0: gamePattern.push("green"); $("#green").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); playSound("green");
        break;
        case 1: gamePattern.push("red"); $("#red").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); playSound("red");
        break;
        case 2: gamePattern.push("yellow"); $("#yellow").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); playSound("yellow");
        break;
        case 3: gamePattern.push("blue"); $("#blue").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); playSound("blue");
        break;
        default: console.log(randomNumber);
        
    }
}

const clickEffect = (activeButton) => {
    switch(activeButton){
        case "green": 
            $("#green").addClass("pressed"); 
            playSound(activeButton);
            setTimeout(() => {
                $("#green").removeClass("pressed");
            },100);
        break;
        case "red": 
            $("#red").addClass("pressed"); 
            playSound(activeButton);
            setTimeout(() => {
                $("#red").removeClass("pressed");
            }, 100);
        break;
        case "yellow": 
            $("#yellow").addClass("pressed"); 
            playSound(activeButton);
            setTimeout(() => {
                $("#yellow").removeClass("pressed");
            }, 100);
        break;
        case "blue": 
            $("#blue").addClass("pressed"); 
            playSound("activeButton");
            setTimeout(() => {
                $("#blue").removeClass("pressed");
            }, 100);
        break;
        default: console.log(activeButton);
    }
}

const check = (clickedButton) => {
    if(clickedButton === gamePattern[nClick]) {
        nClick++;
        if(nClick === gamePattern.length){
            nClick = 0;
            level++;
            $("#level-title").text(`Level ${level}`);
            setTimeout(nextSequence(),100);
        }
    } else {
        gameOver = true;
        nClick = 0;
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
    }
}

$(".btn").on("click", function() {
    let activeButton = this.id;
    console.log(activeButton)
    if(!gameOver){
        clickEffect(activeButton);
        check(activeButton);
    } else {
        clickEffect(activeButton);
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
    }
});

$(document).on("keydown", (event) => {
    if(event.key === 'a' && !gameOver) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
    } else if (gameOver){
        gameOver = false;
        gamePattern = [];
        level = 1;
        $("#level-title").text(`Level ${level}`);
        nextSequence();
    }
});