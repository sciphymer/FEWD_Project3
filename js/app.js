//player moving direction in pixels
const horizon_step = 101;
const vert_step = 86;
const row_position = [vert_step*0.5,vert_step*1.5,vert_step*2.5];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //initiate position, behind the left boundary and random row of starting
    this.x = -101;
    this.y = row_position[Math.round(Math.random()*2)%3];
    //vary in speed 100-500 pixel/dt
    this.speed = 100+Math.round(Math.random()*4)*100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed*dt;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.resetPosition = function() {
    this.x = horizon_step*2;
    this.y = vert_step*4.5;
}

Player.prototype.handleInput = function(direction) {
    switch(direction) {
        case "left":
            if (this.x>0)
                this.x = this.x-horizon_step;
            break;
        case "right":
            if (this.x<horizon_step*4)
                this.x = this.x+horizon_step;
            break;
        case "up":
            if (this.y>vert_step*0.5)
                this.y = this.y - vert_step;
            else
                this.resetPosition();
            break;
        case "down":
            if (this.y<vert_step*4.5)
                this.y = this.y + vert_step;
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
for (let i=0;i<3;i++)
    allEnemies.push(new Enemy);

const player = new Player();
player.resetPosition();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
