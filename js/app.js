// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=0;
    this.sprite = 'images/enemy-bug.png';
    
    
    
    this.reset();
}

Enemy.prototype.reset = function () {
    this.row = getRandomInt(1, 3);
    this.x = -100 - Math.random() * 300;
    this.y = -30 + 83 * this.row;
    this.xSpeed = 100 + Math.random() * 30;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.xSpeed * dt;

    if (this.x > 500) this.reset();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {

    this.reset();
    this.sprite = 'images/char-princess-girl.png';
}

Player.prototype.update = function (dt) {
    
    if ( this.row == 0 ) {
        this.reachWater();
        return null;
    }
    
    this.x = this.col * 101;
    this.y = this.row * 83 - 30;
}

Player.prototype.reset = function () {
    this.row = 5;
    this.col = 2;
    this.x = -100;
    this.y = 0;
};

Player.prototype.reachWater = function(){
    this.reset();
}

Player.prototype.render = function (dt) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (keyCode) {

       // console.log('[Player]\t handleInput ' + keyCode);

    
    
        switch (keyCode) {
        case 'left':
            if (this.col > 0) this.col--;
            break;
        case 'right':
            if (this.col < 4) this.col++;
            break;
        case 'up':
            if (this.row > 0) this.row--;
            break;
        case 'down':
            if (this.row < 5) this.row++;
            break;
        }
    }
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i < 5; i++) {
    var newEnemy = new Enemy();
    allEnemies.push(newEnemy);
}

var player = new Player();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});