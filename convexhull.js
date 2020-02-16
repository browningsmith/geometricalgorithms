//Create variables for canvas and context
var canvas = null;
var ctx = null;

//Create new binary search tree
var bst = new BST();

//Create pointer to BSTIterator();
var iterator = null;

//Create another iterator for the hull constructor to use
var hullIterator = null;

//Create pointer to linked list for upper hull
var upperHull = null;

//Flag to say whether we are checking upper hull, or adding a new Point
var checkingUpperHull = false;

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
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Create a new iterator for the bst
    resetIterator();

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

    //Reset iterator again for another function to use
    resetIterator();
}

//Method to connect dots on a given hull
function drawHull(hull) {

    //If the hull is empty, return
    if (hull === null) {
    
        return;
	}

    //Reset context
    ctx = canvas.getContext("2d");

    //Move brush to first point
    ctx.beginPath();
    ctx.moveTo(hull.getContent().getContent().getX(), hull.getContent().getContent().getY());

    //While the hull has another Point
    while (hull.nextExists()) {
    
        //Move to next point in the hull
        hull = hull.getNext();

        //Create line to this new point
        ctx.lineTo(hull.getContent().getContent().getX(), hull.getContent().getContent().getY());
	}

    //Draw lines
    ctx.stroke();
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

    //Reset upperHull queue
    upperHull = null;

    //Reset upperHull iterator
    hullIterator = new BSTIterator(bst);

    //Draw all points
    drawAllPoints();
}

//Method to be performed when key is pressed
function animateHull(event) {

    //If we are not attempting to animate the convex hull, print error message and return
    if (animating == false) {
    
        console.error("Convex hull already computed. Try adding a new point");
        return;
	}

    //Draw all points
    drawAllPoints();

    //Check to see if we are checking to reject points, or adding a new point.
    if (checkingUpperHull) {
    
        
	}
    else {
    
        //Add a new point to the upperHull
        addToUpperHull();
	}

    //Draw the hull
    drawHull(upperHull);
}

//Method to add new point to upperHull queue
function addToUpperHull() {

    var newPointToAdd = hullIterator.getNext(); //Get the next BST node

    //if newPointToAdd is null, set animating to false and return
    if (newPointToAdd === null) {
    
        console.log("Upper Hull computed");
        animating = false;
        return;
	}

    //Push new point on to the linked list queue
    var oldUpperHull = upperHull; //Grab the front of the queue
    upperHull = new LinkedNode(newPointToAdd); //Create a new linked list node containing the BST node
    upperHull.setNext(oldUpperHull); //Attach the old list
}

//Method to reset main BST iterator
function resetIterator() {

    iterator = new BSTIterator(bst);
}

//Execute this function when document is loaded
function whenReady() {

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}