var canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

canvas.width = innerHeight; 
canvas.height = innerHeight;

bw = canvas.width/15;
bh = canvas.height/15;

canvas.width += bw*2;

let bob = true;

function drawBoard() {
    for (x = 0; x < canvas.width; x += bw) {
        for (y = 0; y < canvas.height; y += bh) {
            if (bob) {
                ctx.fillStyle = "#9FF558";
                bob = false;
            }
            else {
                ctx.fillStyle = "#87D14B";
                bob = true;
            }
            ctx.fillRect(x,y,bw,bh)
        }
    }
    bob = true
}

// let image = document.getElementById("image");

class Apple {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.eat = function () {
            this.x = Math.floor(Math.random()*15)*bw;
            this.y = Math.floor(Math.random()*15)*bh;
        };

        this.update = function () {
            
            this.draw();
        };

        this.draw = function () {
            // ctx.drawImage(image, 200, 200)

        ctx.beginPath();
        ctx.arc(this.x + bw/2, this.y + bh/2, bw/3, 0, 2*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        };
    }
}

let lose = false;
let shlob = false;
let b = 0;
let score = 0;

class Player {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.velocityX = bw;
        this.velocityY = bh;
        this.color = color;

        this.update = function () {
            
            this.savex = this.x;
            this.savey = this.y;

            
            if (this.x < 0) {
                lose = true;
                this.x = 0;
                // this.color = "red";
                this.velocityX = 0;
                this.velocityY = 0;
                if ( shlob === false) {
                    shlob = true;
                    ctx.fillStyle = "darkred";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                }
            }
            if (this.x >= canvas.width) {
                lose = true;
                this.x = canvas.width - bw;
                // this.color = "red";
                this.velocityY = 0;
                this.velocityX = 0;
                if ( shlob === false) {
                    shlob = true;
                    ctx.fillStyle = "darkred";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                }
            }
            if (this.y < 0) {
                lose = true;
                this.y = 0;
                // this.color = "red";
                this.velocityY = 0;
                this.velocityX = 0;
                if ( shlob === false) {
                    shlob = true;
                    ctx.fillStyle = "darkred";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                }
            }
            if (this.y> canvas.height) {
                lose = true;
                this.y = canvas.height - bh;
                // this.color = "red";
                this.velocityY = 0;
                this.velocityX = 0;
                if ( shlob === false) {
                    shlob = true;
                    ctx.fillStyle = "darkred";
                    ctx.fillRect(0,0,canvas.width,canvas.height);
                }
            }

            if (direction == 1) {
                this.x += this.velocityX;
            }
            if (direction == 2) {
                this.y += this.velocityY;
            }
            if (direction == 3) {
                this.x -= this.velocityX;
            }
            if (direction == 4) {
                this.y -= this.velocityY;
            }

            if (i > 0) {
                this.x = playerArray[i-1].savex;
                this.y = playerArray[i-1].savey;
            }
            
            if (i === 0 && kob >= 1) {
                let j;
                for (j=1; j < playerArray.length; j++) {
                    if (this.x == playerArray[j].x && this.y == playerArray[j].y && lose === false) {
                        this.velocityX = 0;
                        this.velocityY = 0;
                        if ( shlob === false) {
                            shlob = true;
                            ctx.fillStyle = "darkred";
                            ctx.fillRect(0,0,canvas.width,canvas.height);
                        }
                        // let k;
                        // for (k = 0; k < playerArray.length; k++) {
                        //     playerArray[k].color = "red";
                        // }
                    }
                }

                for (b = 0; b < appleArray.length; b++) {
                    if (Math.floor(this.x) === Math.floor(appleArray[b].x) && Math.floor(this.y) === Math.floor(appleArray[b].y)) {
                        appleArray[i].eat();
                        let qx = playerArray[playerArray.length-1].savex;
                        let qy = playerArray[playerArray.length-1].savey;
                        playerArray.push(new Player(qx, qy, "#2F6AE6"));
                        score ++;
                    }
                }
                
            }
            
            

            this.draw();
        };

        this.draw = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, bw, bh);
        };
    }
}

let direction = 1;
let changed = false;
window.onkeydown = /** @param {KeyboardEvent} e */function(e) {
    if (changed === false) {
        if (e.key == "ArrowRight" && direction != 3) {
            if (direction != 1) {
                changed = true
            }
            direction = 1;
        }
        if (e.key == "ArrowLeft" && direction != 1) {
            if (direction != 3) {
                changed = true
            }
            direction = 3
        }
        if (e.key == "ArrowUp" && direction != 2) {
            if (direction != 4) {
                changed = true
            }
            direction = 4;
        }
        if (e.key == "ArrowDown" && direction != 4) {
            if (direction != 2) {
                changed = true
            }
            direction = 2;
        }
    }
}


let playerArray = [];
let turn1 = true;

for (i = 0; i < 5; i++) {
    playerArray.push(new Player(0, 0, "#2F6AE6"))
}
playerArray[0].color = "blue"


let appleArray = [];

for (i = 0; i < 1; i++) {
    appleArray.push(new Apple(Math.floor(Math.random()*15)*bw, Math.floor(Math.random()*15)*bh))
}

let game;
game = setInterval(animate, 150);
let kob = 0
function animate () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard()

    for (i = 0; i < playerArray.length; i++) {
        playerArray[i].update();
        
        changed = false
        kob ++;
    }

    for (i = 0; i < appleArray.length; i++) {
        appleArray[i].update();
    }
    document.getElementById("score_p").innerHTML = "Score : " + score
}
