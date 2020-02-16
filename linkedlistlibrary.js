
//Function to create new linked list node
function LinkedNode(content) {

	this.content = content;
	this.next = null;

	//Linked list methods

	//Method to see if next node exists
	this.nextExists = function () {
	
		if (this.next === null) {
		
			return false;
		}

		return true;
	}

	//Method to get next node
	this.getNext = function () {
	
		//If next node does not exist, error and return null
		if (this.nextExists() == false) {
		
			console.error("Next node in linked list is null.");
			return null;
		}

		return this.next;
	}

	//Method to get the content
	this.getContent = function () {
	
		return this.content;
	}
}