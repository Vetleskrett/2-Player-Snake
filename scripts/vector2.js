/*
    Class for 2-dimensional vectors
*/
class Vector2 {
    /*
        Parameters:
            x: x-coordinate
            y: y-coordinate
    */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /*
        Parameters:
            other: another Vector2

        Return:
            The rectilinear distance (Manhattan distance) from this to other
    */
    rectilinearDistance(other) {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }

    /*
        Parameters:
            other: another Vector2

        Return:
            (boolean) this and other share exactly the same coordinates
    */
    equals(other){
        return (this.x === other.x && this.y === other.y)
    }

    /*
        Parameters:
            input: a number or another Vector2

        Return:
            (vector2) this + input
    */
    add(input) {
        if(typeof input === "number"){
            return new Vector2(this.x + input, this.y + input);
        }else{
            return new Vector2(this.x + input.x, this.y + input.y);
        }
    }

    /*
        Parameters:
            input: a number or another Vector2

        Return:
            (vector2) this - input
    */
    subtract(input) {
        if(typeof input === "number"){
            return new Vector2(this.x - input, this.y - input);
        }else{
            return new Vector2(this.x - input.x, this.y - input.y);
        }
    }

    /*
        Parameters:
            num: a number

        Return:
            (vector2) this * num
    */
    multiply(num){
        return new Vector2(this.x * num, this.y * num);
    }

    /*
        Parameters:
            num: a number

        Return:
            (vector2) this / num
    */
    divide(num){
        return new Vector2(this.x / num, this.y / num);
    }

    /*
        Return:
            (vector2) A vector rotated 90 degrees anticlockwise to this
    */
    rotate90(){
        return new Vector2(this.y, -this.x);
    }

    /*
        Parameters:
            xMin: lower x-boundary
            yMin: lower y-boundary
            xMax: higher x-boundary
            yMax: higher y-boundary

        Return:
            (boolean) this is within the four boundaries
    */
    isWithin(xMin, yMin, xMax, yMax){
        return (this.x >= xMin && this.x < xMax && this.y >= yMin && this.y < yMax);
    }

    /*
        Parameters:
            other: another Vector2
            lerpAmount: linear interpolation amount (between 0 and 1)

        Return:
            (vector2) A vector between this and other
    */
    lerp(other, lerpAmount){
        const x = this.x + (other.x - this.x) * lerpAmount;
        const y = this.y + (other.y - this.y) * lerpAmount;
        return new Vector2(x, y);
    }

    /*
        Return:
            (string) the coordinates in string format
    */
    stringName(){
        return this.x + "," + this.y;
    }

    /*
        Return:
            (Vector2) a normalized vector pointing up
    */
    static UP() {
        return new Vector2(0, -1);
    }
    /*
        Return:
            (Vector2) a normalized vector pointing down
    */
    static DOWN() {
        return new Vector2(0, 1);
    }

    /*
        Return:
            (Vector2) a normalized vector pointing right
    */
    static RIGHT() {
        return new Vector2(1, 0);
    }

    /*
        Return:
            (Vector2) a normalized vector pointing left
    */
    static LEFT() {
        return new Vector2(-1, 0);
    }
}

/*
    Class for apple in the class "Game"
    Extends Vector2
*/
class Apple extends Vector2{
    /*
        Parameters:
            game: an instance of the class "Game"
    */
    constructor(game) {
        super();
        this.game = game;
        this.choosePosition();
    }

    /*
        Chooses an available position
    */
    choosePosition(){
        this.x = Math.floor(Math.random() * this.game.cols);
        this.y = Math.floor(Math.random() * this.game.rows);

        while(!this.game.isAvailable(this)){
            this.x++;
            if(this.x >= this.game.cols){
                this.x = 0;
                this.y++;
                if(this.y >= this.game.rows){
                    this.y = 0;
                }
            }
        }
    }

    /*
        Calculates position
        Draws the apple
    */
    draw() {
        const size = this.game.cellSize *  0.8;
        const padding = (this.game.cellSize - size) / 2;
        const position = this.multiply(this.game.cellSize).add(padding);

        ctx.drawImage(appleImg, position.x, position.y, size, size);
    }
}