const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let isJumping=false;
let position = 0;

let started = false;
let end = false;
function handleKeyUp(event) {
    if(event.keyCode === 32){
        if (started) {
            if (end) {
                restart();
            } else {
                if (!isJumping) {
                    jump();
                }
            }
        } else {
            const message = document.querySelector(".message");

            message.style.display = "none";
            started = true;
            background.style.animationName = "slideright";
            createCactus();
        }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position < 150) {
            position += 20;
            dino.style.bottom = position+"px";
        } else {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position > 0) {
                    position -= 20;
                    dino.style.bottom = position + "px";
                } else {
                    clearInterval(downInterval);
                    dino.style.bottom = "0px";
                    isJumping = false;
                }
            },20);
        }
    },20);
}

function createCactus() {
    const cactus = document.createElement("div");
    let cactusPosition = screen.width;
    let randomTime = Math.random()*6000;

    cactus.classList.add("cactus");
    cactus.style.left = cactusPosition+"px";
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{
        if(cactusPosition <-60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else{
            if(cactusPosition>0 && cactusPosition<60 && position<60){
                clearInterval(leftInterval);
                document.body.innerHTML ="<h1 class='game-over'>Fim de jogo</h1>";
                document.body.innerHTML += "<button onclick='restart()' class='restart'>Reiniciar</button>";
                end = true;
            }else{
                cactusPosition-=10;
                cactus.style.left = cactusPosition+"px";
            }
        }
    },20);
    setTimeout(createCactus,randomTime);
}

document.addEventListener("keyup", handleKeyUp);

function restart() {
    document.location.reload(true);
}