//Create variables for canvas and context
var canvas = null;
var ctx = null;

//Create new binary search tree
var bst = new BST();

//Flag to say whether we are animating convex hull or not
var animating = false;

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

function drawAllPoints() {

    //Clear the canvas and reset context
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx = canvas.getContext("2d");

    //Create a new iterator for the bst
    var iterator = new BSTIterator(bst);

    var nextNode;
    //console.log("Attempting to draw point:\n");

    //As long as iterator does not return null, draw next point
    while ((nextNode = iterator.getNext()) !== null) {
    
        var point = nextNode.getContent();

        ctx.beginPath();
        ctx.arc(point.getX(), point.getY(), 1, 0, 2 * Math.PI);
        ctx.fill();

        //console.log("Attempting to draw next point:\n");
	}
}

//Method to be performed when a new point is added
function addPoint(event) {

	//If we are attempting to animate the convex hull, print error message and return
	if (animating) {
	
		console.error("Unable to add new point, convex hull not computed.");
        return;
	}

	//Set animating to true
	animating = true;

	//Add a new point at x and y coordinates of canvas
    var newPoint = new Point(event.offsetX, event.offsetY);

    //Insert the new point into the BST, based on x coordinate
    bst.insert(newPoint, newPoint.getX());

    drawAllPoints();
}

//Execute this function when document is loaded
function whenReady() {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}