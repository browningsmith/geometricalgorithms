var bst = new BST();
var canvas = null;
var ctx = null;

function Point(x, y) {

    this.x = x;
    this.y = y;

    this.getX = function () {

        return this.x;
    };

    this.getY = function () {

        return this.y;
    };
}

function addPoint(event) {

    //Add a new point at x and y coordinates of canvas
    var newPoint = new Point(event.offsetX, event.offsetY);

    //Insert the new point into the BST, based on x coordinate
    bst.insert(newPoint, newPoint.getX());

    //Print points to the console in order

    //Clear console
    console.clear();

    //Create a new iterator for the bst
    var iterator = new BSTIterator(bst);

    var nextNode;

    var n = 1;

    //console.log("Attempting to print first point:\n");

    //As long as iterator does not return null, print coordinates of next point
    while ((nextNode = iterator.getNext()) !== null) {
    
        var point = nextNode.getContent();

        console.log("Point " + n + ": " + point.getX() + ", " + point.getY() + "\n");
        n++;

        //console.log("Attempting to print next point:\n");
	}

    drawPoints();
}

function drawPoints() {

    //Clear the canvas and reset context
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx = canvas.getContext("2d");

    //Create a new iterator for the bst
    var iterator = new BSTIterator(bst);

    var nextNode;
    //console.log("Attempting to draw point:\n");

    //As long as iterator does not return null, print draw next point
    while ((nextNode = iterator.getNext()) !== null) {
    
        var point = nextNode.getContent();

        ctx.beginPath();
        ctx.arc(point.getX(), point.getY(), 1, 0, 2 * Math.PI);
        ctx.fill();

        //console.log("Attempting to draw next point:\n");
	}
}

function whenReady() {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}