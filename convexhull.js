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
var checkingUpperHull = true;

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

    //Change instructions
    document.getElementById("instructions").innerHTML = "Now press any key on the keyboard to watch the convex hull be constructed.";

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
    console.log("Drawing points");
    drawAllPoints();

    //Check to see if we are checking to reject points, or adding a new point.
    if (checkingUpperHull) {
    
        console.log("Checking flag is set to true. Checking points to reject on upper hull");
        //Check the upper hull for bad Points
        checkUpperHull();
	}
    else {
    
        //Add a new point to the upperHull
        console.log("Checking flag is set to false. Adding new point to upper hull. Setting checking flag to true");

        //If a new point is added to the upperHull, set checkingUpperHull to true
        if (addToUpperHull()) {
      
            checkingUpperHull = true;
		}
        else {
      
            //otherwise set checkingUpperHull to false and set animating to false

            document.getElementById("instructions").innerHTML = "Upper Hull completed. Click to add a new point.";
            console.log("No more points to add to upper hull. Setting checking to false and animating to false");
            checkingUpperHull = false;
            animating = false;
		}
	}

    //Draw the hull

    console.log("Drawing lines of upper hull");
    drawHull(upperHull);
}

//Method to add new point to upperHull queue
function addToUpperHull() {

    var newPointToAdd = hullIterator.getNext(); //Get the next BST node

    //if newPointToAdd is null, set animating to false and return
    if (newPointToAdd === null) {
    
        console.log("No more points to add");
        return false; //return false if unable to add more points
	}

    //Push new point on to the linked list queue
    var oldUpperHull = upperHull; //Grab the front of the queue
    upperHull = new LinkedNode(newPointToAdd); //Create a new linked list node containing the BST node
    upperHull.setNext(oldUpperHull); //Attach the old list

    return true; //Return true since a new point was added
}

//Method to check last three points in upperHull queue, and reject if necessary
function checkUpperHull() {

    //If the hull is empty, set checkingUpperHull to false and return
    if (upperHull === null) {
    
        console.log("Upper hull is empty, finishing check, setting checking flag to false");
        checkingUpperHull = false;
        return;
	}

    //Variable to hold point3
    console.log("Recording point3");
    var point3 = upperHull;

    //If point3 has no neighboring point2, set checkingUpperHull to false and return
    if (point3.nextExists() == false) {
    
        console.log("Upper hull has less than two points. Finishing check, setting checking flag to false");
        checkingUpperHull = false;
        return;
	}

    //Variable to hold point2
    console.log("Recording point2");
    var point2 = point3.getNext();

    //If point2 has no neighboring point1, set checkingUpperHull to false and return
    if (point2.nextExists() == false) {
    
        console.log("Upper hull has less than three points. Finishing check, setting checking flag to false");
        checkingUpperHull = false;
        return;
	}

    //variable to hold point1
    console.log("Recording point1");
    var point1 = point2.getNext();

    //Compute the orientation
    console.log("Computing orientation");
    var orientation = ((point1.getContent().getContent().getY() - point2.getContent().getContent().getY()) * (point3.getContent().getContent().getX() - point2.getContent().getContent().getX())) - ((point2.getContent().getContent().getY() - point3.getContent().getContent().getY()) * (point2.getContent().getContent().getX() - point1.getContent().getContent().getX()));

    //If the orientation is negative (counterclockwise) reject point2
    if (orientation < 0) {
    
        console.log("Orientation determined to be counterclockwise. Rejecting point2. Checking flag should remain true.");
        //Attach point1 as point3's next element
        point3.setNext(point1);
	}

    //If the orientation is positive or colinear, accept point2 and proceed
    else {
    
        console.log("Orientation determined to be clockwise. Keeping point2. Finishing check, setting checking flag to false");
        checkingUpperHull = false;
	}
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