/*
    Class for the game
*/
class Game {
    /*
    Parameters:
        numOfPlayers: Number of (human) players
        snake1colour: The colour of snake1
        snake2colour: The colour of snake2
        newPathModuloDivisor: The divisor of the modulo expression in AISnake.update() to determine if it should create a new path
        columns: Number of columns
        rows: Number of rows
        updateFrequency: The frequency of the update interval (Hz)
        pointsToWin: Points required for a snake to win
    */
    constructor(numOfPlayers, snake1colour, snake2colour, newPathModuloDivisor, columns, rows, updateFrequency, pointsToWin) {
        this.numOfPlayers = numOfPlayers;
        this.snake1colour = snake1colour;
        this.snake2colour = snake2colour;
        this.newPathModuloDivisor = newPathModuloDivisor;
        this.updateFrequency = updateFrequency;
        this.pointsToWin = pointsToWin;
        pointsToWinEl.innerHTML = pointsToWin < Infinity? pointsToWin.toString(): "∞";

        this.cols = columns;
        this.rows = rows;

        this.cellSize = gameAreaEl.width / this.cols;

        this.startDelay = 500; //ms
        this.endDelay = 3000; //ms
        this.gameOverDelay = 4000; //ms

        this.lerpAmountStart = -0.85;

        this.updateCount = 0;
        this.gameOver = false;

        this.backgroundColour = "#fff6c7";
        gameAreaTextEl.style.webkitTextStrokeColor = this.backgroundColour;

        this.togglePlayerKeysVisibility();
        document.addEventListener('keydown', (e) => this.keyDown(e));

        this.startNewRound();
    }

    /*
        Creates new snakes and apple
        Draws the first frame
        Starts the two game loops after startDelay
    */
    startNewRound() {
        gameAreaTextEl.innerHTML = "";

        this.createNewSnakes();
        this.createNewApple();

        this.draw();

        setTimeout(() => {
            if(!this.gameOver) {
                this.lastUpdateTimestamp = window.performance.now();
                this.startDrawLoop();
                this.updateLoop = setInterval(() => this.update(), 1000 / this.updateFrequency);
            }
        }, this.startDelay);
    }

    /*
        Stops both game loops
        Removes the event listener
        Clears the HTML-elements for player1 points, player2 points and game area text
    */
    selfDestruct(){
        this.gameOver = true;
        clearInterval(this.updateLoop);
        this.stopDrawLoop();
        document.removeEventListener('keydown', (e) => this.keyDown(e));
        snake1pointsEl.innerHTML = "0";
        snake2pointsEl.innerHTML = "0";
        gameAreaTextEl.innerHTML = "";
    }

    /*
        Creates new snakes

        0 player:
            2 x AISnake
        1 player:
            1 x PlayerSnake
            1 x AISnake
        2 player:
            2 x PlayerSnake
    */
    createNewSnakes(){
        const snake1points = this.snake1? this.snake1.points : 0;
        if(this.numOfPlayers >= 1){
            this.snake1 = new PlayerSnake(this, 1, 3, this.snake1colour, snake1points, snake1pointsEl);
        }else{
            this.snake1 = new AISnake(this, 1, 3, this.snake1colour, snake1points, snake1pointsEl, this.newPathModuloDivisor);
        }

        const snake2points = this.snake2? this.snake2.points : 0;
        if(this.numOfPlayers >= 2){
            this.snake2 = new PlayerSnake(this, this.cols - 2, 3, this.snake2colour, snake2points, snake2pointsEl);
        }else{
            this.snake2 = new AISnake(this, this.cols - 2, 3, this.snake2colour, snake2points, snake2pointsEl, this.newPathModuloDivisor);
        }
    }

    /*
        Creates a new apple
    */
    createNewApple(){
        this.apple = new Apple(this);
    }

    /*
        Hides keys if snake is AISnake
    */
    togglePlayerKeysVisibility(){
        if(this.numOfPlayers >= 1){
            player1keysWrapper.style.visibility = "visible";
        }else{
            player1keysWrapper.style.visibility = "hidden";
        }

        if(this.numOfPlayers >= 2){
            player2keysWrapper.style.visibility = "visible";
        }else{
            player2keysWrapper.style.visibility = "hidden";
        }
    }

    /*
        Updates snakes
        Check for collision
        Ends the round if a snake has collided
    */
    update() {
        this.lastUpdateTimestamp = window.performance.now();

        this.snake1.update();
        this.snake2.update();

        const snake1collided = this.snake1.collision(this.snake2);
        const snake2collided = this.snake2.collision(this.snake1);

        if(snake1collided || snake2collided) {
            this.endRound(snake1collided, snake2collided);
            return;
        }

        this.updateCount++;
    }

    /*
        Parameters:
            snake1collided: (boolean) snake1 has collided
            snake2collided: (boolean) snake2 has collided

        Stops the game loops
        Gives point to winner of round
        Goes back to menu if game over, otherwise starts new round
    */
    endRound(snake1collided, snake2collided){
        clearInterval(this.updateLoop);
        this.stopDrawLoop();
        this.draw();

        playSFX(hitSFX);

        if (snake1collided && snake2collided) {
            gameAreaTextEl.style.color = "#000000";
            gameAreaTextEl.innerHTML = "Draw";
        } else if (snake1collided) {
            this.givePointTo(2);
        } else if (snake2collided) {
            this.givePointTo(1);
        }

        if(this.gameOver) {
            setTimeout(backToMenu, this.gameOverDelay);
        }else{
            setTimeout(() => this.startNewRound(), this.endDelay);
        }
    }

    /*
        Parameters:
            snakeNr: snake number (1 for snake1 and 2 for snake2)

        Update point HTML-element
        Shows who got a point / won
    */
    givePointTo(snakeNr){
        const snake = (snakeNr === 1)? this.snake1 : this.snake2;
        snake.points++;
        snake.pointsEl.innerHTML = snake.points.toString();
        bounce(snake.pointsEl, 1000);

        let str = "";
        if(snake.points >= this.pointsToWin){
            str = "Player " + snakeNr + " won!";
            playSFX(winSFX);
            this.gameOver = true;
        }else{
            str = "Point to Player " + snakeNr;
            playSFX(pointSFX);
        }

        gameAreaTextEl.style.color = snake.colour;
        gameAreaTextEl.innerHTML = str;
    }

    /*
        Starts the draw loop with requestAnimationFrame
    */
    startDrawLoop(){
        this.drawLoopId = requestAnimationFrame((timestamp) => this.drawLoop(timestamp));
    }

    /*
        Stops the draw loop
    */
    stopDrawLoop(){
        cancelAnimationFrame(this.drawLoopId);
    }

    /*
        Parameters:
            timestamp: Time since start of program (provided by requestAnimationFrame)

        Calculates linear interpolation amount
        Draws
        Recursively call itself with requestAnimationFrame
    */
    drawLoop(timestamp){
        const timeSinceLastUpdate = timestamp - this.lastUpdateTimestamp;
        const updatePeriod = 1000 / this.updateFrequency;
        const lerpAmount = timeSinceLastUpdate / updatePeriod + this.lerpAmountStart;

        this.draw(lerpAmount);
        this.startDrawLoop();
    }

    /*
        Parameters:
            lerpAmount: linear interpolation amount

        Draws the background, the apple, snake1 and Snake2
    */
    draw(lerpAmount = this.lerpAmountStart) {
        ctx.fillStyle = this.backgroundColour;
        ctx.fillRect(0, 0, gameAreaEl.width, gameAreaEl.height);

        this.apple.draw();

        this.snake1.draw(lerpAmount);
        this.snake2.draw(lerpAmount);
    }

    /*
        Parameters:
            e: keydown event

        Adds CSS-animation "bounce" to key pressed
        Changes direction of snake if snake is PlayerSnake
    */
    keyDown(e){
        if(e.key !== " ") { // To avoid error message for space-key pushed
            const keyEl = document.querySelector(".key#" + e.key);
            if (keyEl) {
                bounce(keyEl, 300);
            }
        }

        if(!this.snake1.isAI){
            const keyDirectionTable = {
                87: Vector2.UP(),   // W
                68: Vector2.RIGHT(),// D
                83: Vector2.DOWN(), // S
                65: Vector2.LEFT()  // A
            };
            const direction = keyDirectionTable[e.keyCode];
            if(direction){
                this.snake1.setDirection(direction);
            }
        }

        if(!this.snake2.isAI){
            const keyDirectionTable = {
                38: Vector2.UP(),   // ARROW_UP
                39: Vector2.RIGHT(),// ARROW_RIGHT
                40: Vector2.DOWN(), // ARROW_DOWN
                37: Vector2.LEFT()  // ARROW_LEFT
            };
            const direction = keyDirectionTable[e.keyCode];
            if(direction){
                this.snake2.setDirection(direction);
            }
        }
    }

    /*
        Parameters:
            position: a Vector2 position

        Return:
            (boolean) is within game area
    */
    isValidPosition(position){
        return position.isWithin(0, 0, this.cols, this.rows)
    }

    /*
        Parameters:
            position: a Vector2 position

        Return:
            (boolean) position is within game area and not occupied by a snake
    */
    isAvailable(position){
        return (this.isValidPosition(position) && !this.snake1.bodyContains(position) && !this.snake2.bodyContains(position) && !this.snake1.newHead.equals(position) && !this.snake2.newHead.equals(position));
    }
}