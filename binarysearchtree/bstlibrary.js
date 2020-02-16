//Function to create a new BST node
function BSTNode(content, comparativeProperty) {

	//Create pointers to parent, left child and right child
	this.parent = null;
	this.left = null;
	this.right = null;

	//Place the content and the comparativeProperty
	this.content = content;
	this.comparativeProperty = comparativeProperty;

	//Node methods

	//Method to get parent node
	this.getParent = function() {
	
		return this.parent;
	};

	//Method to get left child node
	this.getLeft = function () {
	
		return this.left;
	};

	//Method to get right child node
	this.getRight = function () {
	
		return this.right;
	};

	//Method to get content object
	this.getContent = function () {
	
		return this.content;
	};

	//Method to get content object's comparative property
	this.getComparativeProperty = function () {
	
		return this.comparativeProperty;
	};

	//Method to set parent
	this.setParent = function (node) {
	
		this.parent = node;
	};

	//Method to set left child
	this.setLeft = function (node) {
	
		this.left = node;
	};

	//Method to set right child
	this.setRight = function (node) {
	
		this.right = node;
	};
}

//Function to create a new BST
function BST() {

	this.root = null;

	//BST methods

	//gets the root of a BST
	this.getRoot = function() {
	
		return this.root;
	};

	//function to insert a new Node into the proper spot in the tree
	this.insert = function (content, comparativeProperty) {

		//If the root is null, insert the new node as the root and return
		if (this.getRoot() === null) {
		
			this.root = new BSTNode(content, comparativeProperty);
			return;
		}
	
		//Create a pointer to the node currently being compared, set it to the root of the BST
		var node = this.root;

		//As long as the current node is not null:
		while (node !== null) {
		
			//If comparativeProperty is less than or equal to node.comparativeProperty
			if (comparativeProperty <= node.getComparativeProperty()) {
			
				//If node's left child is null, insert there and return
				if (node.getLeft() === null) {
				
					//Create a temp variable to hold new Node
					var newNode = new BSTNode(content, comparativeProperty);
					
					//Set the new node's parent to be the current Node
					newNode.setParent(node);

					//Set the nodes left child to be the newNode
					node.setLeft(newNode);
					return;
				}

				//Otherwise traverse into left node
				else {
				
					node = node.getLeft();
				}
			}

			//If comparativeProperty is greater than node.comparativeProperty
			if (comparativeProperty > node.getComparativeProperty()) {
			
				//If node's right child is null, insert there and return
				if (node.getRight() === null) {
				
					//Create a temp variable to hold new Node
					var newNode = new BSTNode(content, comparativeProperty);
					
					//Set the new node's parent to be the current Node
					newNode.setParent(node);

					//Set the nodes right child to be the newNode
					node.setRight(newNode);
					return;
				}

				//Otherwise traverse into right node
				else {
				
					node = node.getRight();
				}
			}
		}
	};
}

//Function to create new BSTIterator
function BSTIterator(bst) {

	//Don't create iterator if bst is empty
	if (bst.getRoot() === null) {
	
		console.error("Cannot create BSTIterator for empty BST");
		return null;
	}

	this.node = bst.getRoot();

	//state variable, to determine what the iterator does next
	// 0 means nothing has been checked
	// 1 means left (right if reversed) has been checked
	// 2 means left (right if reversed) and center have been checked
	// 3 means all have been checked
	this.state = 0;

	//direction variable, to update state if reversing direction
	this.reversed = false;

	//BSTIterator methods

	//Method to get current Node
	this.getNode = function () {
	
		return this.node;
	}
	
	//Method to check for parent
	this.hasParent = function () {
	
		if (this.node.getParent() === null) {
		
			return false;
		}
		else {
		
			return true;
		}
	}

	//Method to check for left child
	this.hasLeft = function () {
	
		if (this.node.getLeft() === null) {
		
			return false;
		}
		else {
		
			return true;
		}
	}

	//Method to check for right child
	this.hasRight = function () {
	
		if (this.node.getRight() === null) {
		
			return false;
		}
		else {
		
			return true;
		}
	}

	//Method to go to parent
	this.goToParent = function () {
	
		//If node has parent, go to it
		if (this.hasParent()) {
		
			this.node = this.node.getParent();
		}
		else {
		
			//print an error message
			console.error("Iterator did not move, Iterator had no parent.");
		}
	}

	//Method to go to left child
	this.goLeft = function () {
	
		//If node has left child, go to it
		if (this.hasLeft()) {
		
			this.node = this.node.getLeft();
		}
		else {
		
			//print an error message
			console.error("Iterator did not move, Iterator had no left child.");
		}
	}

	//Method to go to right child
	this.goRight = function () {
	
		//If node has right child, go to it
		if (this.hasRight()) {
		
			this.node = this.node.getRight();
		}
		else {
		
			//print an error message
			console.error("Iterator did not move, Iterator had no right child.");
		}
	}

	//Method to move to the next node during in-order traversal. Goes to left-most node if at root and state is 0
	this.getNext = function () {
	
		//Infinite loop to traverse tree
		while (true) {

			//As long as the state is 0, meaning nothing has been checked, attempt to go left
			while (this.state == 0) {
		
				//console.log("State is 0. Attempting to go left");
				//Check to see if node has left child
				if (this.hasLeft()) {
			
					//console.log("Current node has left child, going left");
					//If node has left child, traverse left
					this.goLeft();
				}
				else {
			
					//console.log("Current node no left child, setting state to 1");
					//we have no left child, set state to 1 meaning left has been checked
					this.state = 1;
				}
			}

			//If the state is 1, meaning left has been checked, but not the center, return this node and set state to 2
			if (this.state == 1) {
			
				//console.log("State is 1, returning current node and setting state to 2");
				this.state = 2;
				return this.node;
			}

			//As long as the state is 2, meaning left and center have been checked, attempt to go right
			while (this.state == 2) {
		
				//console.log("State is 2. Attempting to go right");
				//Check to see if node has a right child
				if (this.hasRight()) {
			
					//console.log("Current node has right child, going right. Resetting state to 0");
					//If node has right child, reset state to 0 and go right
					this.state = 0;

					this.goRight();
				}

				//If node has no right child, set state to 3 meaning all has been checked and we need to return to parent
				else {
				
					//console.log("Current node has no right child. Setting state to 3");
					this.state = 3;
				}
			}

			//As long as the state is 3, meaning this node and everything below has been checked
			// we need to return to the parent
			while (this.state == 3) {

				//console.log("State is 3. Attempting to return to parent");
				//If we have no parent, then we are at the root. Return a null pointer
				if (this.hasParent() == false) {
				
					//console.log("Current node has no parent. Returning a null pointer");
					return null;
				}
			
				//If we are the parent's left child, then set to state 1, meaning left was checked
				if (this.node === this.node.getParent().getLeft()) {
				
					//console.log("Current node is left child of parent. Setting state to 1");
					this.state = 1;
				}

				//If we are the parent's right child, then set state to 3, meaning all was checked
				else if (this.node === this.node.getParent().getRight()) {
				
					//console.log("Current node is right child of parent. Setting state to 3");
					this.state = 3;
				}

				//Go up to parent
				//console.log("Moving up to parent");
				this.node = this.node.getParent();
			}
		}
	}

	//Method to move to the previous node during reverse-order traversal. Goes to the right-most node if at root and state is 0
	/*this.getPrevious = function () {
	
		//Infinite loop to traverse tree
		while (true) {

			//As long as the state is 0, meaning nothing has been checked, attempt to go right
			while (this.state == 0) {
		
				//console.log("State is 0. Attempting to go right");
				//Check to see if node has right child
				if (this.hasRight()) {
			
					//console.log("Current node has right child, going right");
					//If node has right child, traverse right
					this.goRight();
				}
				else {
			
					//console.log("Current node no right child, setting state to 1");
					//we have no right child, set state to 1 meaning right has been checked
					this.state = 1;
				}
			}

			//If the state is 1, meaning right has been checked, but not the center, return this node and set state to 2
			if (this.state == 1) {
			
				//console.log("State is 1, returning current node and setting state to 2");
				this.state = 2;
				return this.node;
			}

			//As long as the state is 2, meaning right and center have been checked, attempt to go left
			while (this.state == 2) {
		
				//console.log("State is 2. Attempting to go left");
				//Check to see if node has a left child
				if (this.hasLeft()) {
			
					//console.log("Current node has left child, going left. Resetting state to 0");
					//If node has left child, reset state to 0 and go left
					this.state = 0;

					this.goLeft();
				}

				//If node has no left child, set state to 3 meaning all has been checked and we need to return to parent
				else {
				
					//console.log("Current node has no left child. Setting state to 3");
					this.state = 3;
				}
			}

			//As long as the state is 3, meaning this node and everything below has been checked
			// we need to return to the parent
			while (this.state == 3) {

				//console.log("State is 3. Attempting to return to parent");
				//If we have no parent, then we are at the root. Return a null pointer
				if (this.hasParent() == false) {
				
					//console.log("Current node has no parent. Returning a null pointer");
					return null;
				}
			
				//If we are the parent's right child, then set to state 1, meaning right was checked
				if (this.node === this.node.getParent().getRight()) {
				
					//console.log("Current node is left child of parent. Setting state to 1");
					this.state = 1;
				}

				//If we are the parent's left child, then set state to 3, meaning all was checked
				else if (this.node === this.node.getParent().getLeft()) {
				
					//console.log("Current node is right child of parent. Setting state to 3");
					this.state = 3;
				}

				//Go up to parent
				//console.log("Moving up to parent");
				this.node = this.node.getParent();
			}
		}
	}*/
}