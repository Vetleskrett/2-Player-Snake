/*
    Parameters:
        game: an instance of the class "Game"
        start: Start position
        goal: position we want to find shortest path to

    Return:
        (Array) an array of positions to get to the goal (empty array if it is impossible to find a path to the goal)
*/

function aStar(game, start, goal) {
    let grid = new Map();
    let open = [];

    /*
        Class for nodes in the search tree
    */
    class Node {
        constructor(position, g, cameFrom) {
            this.position = position;
            this.g = g;
            this.h = position.rectilinearDistance(goal);
            this.cameFrom = cameFrom;
            this.open = true;
            this.calculateF();

            grid.set(position.stringName(), this);
            open.push(this);
        }

        /*
            Calculates the f-value of the node (g + h)
        */
        calculateF() {
            this.f = this.g + this.h;
        }
    }

    /*
        Parameters:
            nodes: an array of nodes

        Sorts the array by f-value
        Removes the first element (which has the lowest f-value)

        Return:
            (Node) The node with the lowest f-value
    */
    function removeLowestF(nodes){
        nodes.sort((a, b) => a.f -b.f);
        const node = nodes.shift();
        node.open = false;
        return node;
    }

    /*
        Parameters:
            node: node to reconstruct path from

        Traverses back from node to start, keeping track of and storing the path
        Reverses the path so it goes from start to goal

        Return:
            (Array) a path from start to goal (excluding start)
    */
    function reconstructPath(node){
        let path = [];
        while(node.cameFrom){
            path.push(node.position);
            node = node.cameFrom;
        }
        return path.reverse();
    }

    /*
        Parameters:
            arr: an array

        Shuffles the array

        Return:
            (Array) a shuffled array
    */
    function shuffle(arr){
        let out = [];
        const length = arr.length;
        for(let i = 0; i < length; i++){
            const index = Math.floor(Math.random() * arr.length);
            const element = arr.splice(index, 1)[0];
            out.push(element);
        }
        return out;
    }

    new Node(start, 0); // Start-node

    while(open.length > 0){
        const currentNode = removeLowestF(open);

        if(currentNode.position.equals(goal)){
            return reconstructPath(currentNode);
        }

        const directions = shuffle([Vector2.UP(), Vector2.RIGHT(), Vector2.DOWN(), Vector2.LEFT()]); // Shuffle to get more natural looking moves
        const g = currentNode.g + 1;

        for(let direction of directions){
            const neighbourPosition = currentNode.position.add(direction);

            if(game.isAvailable(neighbourPosition)) {

                if (grid.has(neighbourPosition.stringName())) {
                    const neighbourNode = grid.get(neighbourPosition.stringName());
                    if (g < neighbourNode.g) {
                        neighbourNode.g = g;
                        neighbourNode.calculateF();
                        neighbourNode.cameFrom = currentNode;
                        if (!neighbourNode.open) {
                            neighbourNode.open = true;
                            open.push(neighbourNode);
                        }
                    }
                } else {
                    new Node(neighbourPosition, g, currentNode);
                }

            }
        }
    }

    // Found no path - return empty array
    return [];
}
