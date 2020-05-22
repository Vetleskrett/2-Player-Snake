/*
    General class for shared methods and properties of PlayerSnake and AISnake
*/
class Snake {
    /*
        Parameters:
            game: an instance of the class "Game"
            x: starting x-coordinate for head
            y: starting y-coordinate for head
            colour: colour of the snake
            startingPoints: current number of points for the snake
            pointsEl: the HTML-element showing number of points for the snake
    */
    constructor(game, x, y, colour, startingPoints, pointsEl) {
        this.game = game;
        this.colour = colour;
        this.points = startingPoints;
        this.pointsEl = pointsEl;

        this.body = [];
        let startLength = 3;
        for(let i = 0; i < startLength; i++){
            this.body.push(new Vector2(x, y - i));
        }

        this.newHead = new Vector2(x, y + 1);
        this.oldTail = new Vector2(x, y - startLength);
    }

    /*
        Parameters:
            start: segment start
            end: segment end

        Draws a line from start to end
    */
    drawSegment(start, end){
        ctx.strokeStyle = this.colour;
        ctx.lineCap = "round";
        ctx.lineWidth = this.game.cellSize * 0.85;

        const p1 = start.add(0.5).multiply(this.game.cellSize);
        const p2 = end.add(0.5).multiply(this.game.cellSize);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    /*
        Parameters:
            lerpAmount: linear interpolation amount

        Draws tail, body and head
    */
    draw(lerpAmount) {
        this.drawTail(lerpAmount);
        this.drawBody(lerpAmount);
        this.drawHead(lerpAmount);
    }

    /*
        Parameters:
            lerpAmount: linear interpolation amount

        Calculates tail start and end
        Draws tail
    */
    drawTail(lerpAmount){
        let tailStart, tailEnd;
        if(lerpAmount < 0){
            tailStart = this.body[this.body.length - 1];
            tailEnd = this.oldTail.lerp(this.body[this.body.length - 1], lerpAmount + 1);
        }else {
            tailStart = this.body[this.body.length - 2];
            tailEnd = this.body[this.body.length - 1].lerp(this.body[this.body.length - 2], lerpAmount);
        }
        this.drawSegment(tailStart, tailEnd);
    }

    /*
        Parameters:
            lerpAmount: linear interpolation amount

        Calculates body start and end
        Draws body
    */
    drawBody(lerpAmount){
        let bodyStart, bodyEnd;
        if(lerpAmount < 0){
            bodyStart = 2;
            bodyEnd = this.body.length;
        }else{
            bodyStart = 1;
            bodyEnd = this.body.length - 1;
        }

        for(let i = bodyStart; i < bodyEnd; i++){
            this.drawSegment(this.body[i - 1], this.body[i]);
        }
    }

    /*
        Parameters:
            lerpAmount: linear interpolation amount

        Calculates head start and end
        Draws head and eyes
    */
    drawHead(lerpAmount){
        let headStart, headEnd;
        if(lerpAmount < 0){
            headStart = this.body[1];
            headEnd = this.body[1].lerp(this.body[0], lerpAmount + 1);
        }else {
            headStart = this.body[0];
            headEnd = this.body[0].lerp(this.newHead, lerpAmount);
        }

        this.drawSegment(headStart, headEnd);
        this.drawEyes(headEnd, lerpAmount);
    }

    /*
        Parameters:
            head: position of the edge of the snake head
            lerpAmount: linear interpolation amount

        Calculates eye positions
        Draws eyes
    */
    drawEyes(head, lerpAmount){
        const eyeRadius = this.game.cellSize * 0.1;

        let direction;
        if(lerpAmount < 0){
            direction = this.body[0].subtract(this.body[1]);
        }else{
            direction = this.newHead.subtract(this.body[0]);
        }

        ctx.fillStyle = "#000000";
        ctx.lineCap = "round";

        const eyeCenter = head
            .add(0.5)
            .add(direction.multiply(0.2))
            .multiply(this.game.cellSize);

        const eyeOffset = direction
            .rotate90()
            .multiply(0.2)
            .multiply(this.game.cellSize);

        const eye1 = eyeCenter.add(eyeOffset);
        const eye2 = eyeCenter.subtract(eyeOffset);

        ctx.beginPath();
        ctx.arc(eye1.x, eye1.y, eyeRadius, 0, 2 * Math.PI);
        ctx.arc(eye2.x, eye2.y, eyeRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    /*
        Plays bitSFX and creates new apple if eaten apple, otherwise removes last element from body
        Plays turnSFX if snake is turning
        Adds newHead at the front of body
    */
    update() {
        const eatenApple = this.newHead.equals(this.game.apple);
        if(eatenApple){
            game.createNewApple();
            playSFX(biteSFX);
        }else{
            this.oldTail = this.body.pop();
        }

        const forwards = this.body[0].subtract(this.body[1]);
        const direction = this.newHead.subtract(this.body[0]);
        if(!direction.equals(forwards)){
            playSFX(turnSFX);
        }

        this.body.unshift(this.newHead);
    }

    /*
        Parameters:
            otherSnake: the other snake

        Return:
            (boolean) snake collided with wall, the other snake or itself
    */
    collision(otherSnake) {
        return (
            !this.game.isValidPosition(this.body[0]) ||
            otherSnake.bodyContains(this.body[0]) ||
            this.bodyContains(this.body[0]) > 1
        )
    }

    /*
        Parameters:
            position: a Vector2 position

        Return:
            (Number) number of elements in body which equals position
    */
    bodyContains(position){
        return this.body.filter((c) => c.equals(position)).length;
    }
}

/*
    Class for snakes controlled by humans
    Extends Snake
*/
class PlayerSnake extends Snake {
    /*
        Parameters:
            game: an instance of the class "Game"
            x: starting x-coordinate for head
            y: starting y-coordinate for head
            colour: colour of the snake
            startingPoints: current number of points for the snake
            pointsEl: the HTML-element showing number of points for the snake
    */
    constructor(game, x, y, colour, startingPoints, pointsEl) {
        super(game, x, y, colour, startingPoints, pointsEl);
        this.isAI = false;
    }


    /*
        Calls super.update()
        Sets newHead as the position right in front of the snake (the same direction)
    */
    update(){
        super.update();
        const direction = this.body[0].subtract(this.body[1]);
        this.newHead = this.body[0].add(direction);
    }

    /*
        Parameters:
            direction: A normalized Vector2 with the new direction

        Changes newHead based on direction if the direction is not backwards
    */
    setDirection(direction){
        const backwards = this.body[1].subtract(this.body[0]);
        if(!direction.equals(backwards)){ // Illegal for snake to move backwards into it's own body
            this.newHead = this.body[0].add(direction);
        }
    }
}

/*
    Class for snakes controlled by the computer
    Extends Snake
*/
class AISnake extends Snake {
    /*
        Parameters:
            game: an instance of the class "Game"
            x: starting x-coordinate for head
            y: starting y-coordinate for head
            colour: colour of the snake
            startingPoints: current number of points for the snake
            pointsEl: the HTML-element showing number of points for the snake
            newPathModuloDivisor: The divisor of the modulo expression in update() to determine if it should create a new path
    */
    constructor(game, x, y, colour, startingPoints, pointsEl, newPathModuloDivisor) {
        super(game, x, y, colour, startingPoints, pointsEl);
        this.newPathModuloDivisor = newPathModuloDivisor;
        this.path = [];
        this.isAI = true;
    }

    /*
        Calls super.update()
        Creates a new path if path is empty or the modulo expression equals zero
        Removes the first element of path and sets it as newHead
    */
    update() {
        super.update();

        const findNewPath = (game.updateCount % this.newPathModuloDivisor) === 0;
        if(this.path.length <= 0 || findNewPath){
            this.createNewPath();
        }
        this.newHead = this.path.shift();
    }

    /*
        Creates a path from the snake head to the apple with the A* search algorithm
        If A* fails to find a path it sets the path to an available neighbour cell
        If there are no available neighbour cell it sets the path to the position right in front of the snake (and crashes)
    */
    createNewPath(){
        this.path = aStar(this.game, this.body[0], this.game.apple);

        if (this.path.length <= 0) {
            // No path to the apple: go to an available neighbour cell
            this.path = this.goToAvailableNeighbour();
        }

        if (this.path.length <= 0) {
            // No available cell: continue forwards and crash
            this.path = this.continueForwards();
        }
    }

    /*
        Return:
            (Array) an array containing an available neighbour cell (empty array if there are no available neighbour cells)
    */
    goToAvailableNeighbour(){
        const directions = [Vector2.UP(), Vector2.RIGHT(), Vector2.DOWN(), Vector2.LEFT()];
        for (let direction of directions) {
            const neighbourPosition = this.body[0].add(direction);
            if (this.game.isAvailable(neighbourPosition)) {
                return [neighbourPosition];
            }
        }

        // Found no available neighbour - return empty array
        return [];
    }

    /*
        Return:
            (Array) an array containing the position right in front of the snake
    */
    continueForwards(){
        const direction = this.body[0].subtract(this.body[1]);
        const position = this.body[0].add(direction);
        return [position];
    }
}