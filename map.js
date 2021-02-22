/*-----------------------------------------------------------------
    Description: Class to describe the TreeNode object.
                Contains:
                    String value property
                    TreeNode parentNode property

            This function is called from the onClick() event for our
            HTML button
-----------------------------------------------------------------*/
class TreeNode {
    constructor(value, parentNode) {
        this.value = value;
        this.parentNode = parentNode;
    }

    toString() {
        return "Val: " + this.value + ", Parent Val: " + this.parentNode.value;
    }
}

//Builds the Tree structure of the map
let usa = new TreeNode("USA");
let canada = new TreeNode("CAN",usa);
let mexico = new TreeNode("MEX",usa);
let belize = new TreeNode ("BLZ", mexico);
let guatemala = new TreeNode("GTM", mexico);
let elSalvador = new TreeNode("SLV", guatemala);
let honduras = new TreeNode("HND", guatemala);
let nicaragua = new TreeNode("NIC", honduras);
let costaRica = new TreeNode("CRI", nicaragua);
let panama = new TreeNode("PAN", costaRica);
let destNode = usa;


/*-----------------------------------------------------------------
Description: Main function called from the onClick() event for our
            HTML button
            Determines path from USA to a particular country, given
            a 3 character country code
-----------------------------------------------------------------*/
function getPath() {
    let destination = document.getElementById('country').value;
    let path = document.getElementById('path');
    path.innerHTML = "";

    let pathArray = [];
    let start;

    start = getStartNode(destination);
    if (start == null) {
        path.innerHTML = "You did not enter a valid country code.  Try again."
    } 
    else {
        calculatePath(start, pathArray, destNode);
        listOfCountries(pathArray, path);
    }
}


/*-----------------------------------------------------------------
Description: Places the contents of the path array (backwards) into
            list elements of the HTML to display to the user

Parameters: array - contains a list of three letter country codes
                    to display
            path -  element from HTML with id "path"
-----------------------------------------------------------------*/
function listOfCountries(array, path) {
    for (i = array.length - 1; i >= 0; i--) {
        var li = document.createElement("li");
        var text = document.createTextNode(array[i]);
        li.appendChild(text);
        path.appendChild(li);
    }
}

/*-----------------------------------------------------------------
Description: Determines which TreeNode to start at given the user
            input

Parameters: val - value entered by user

Returns: the TreeNode to start at, if user input doesn't match one of
        the three character country codes, returns null
-----------------------------------------------------------------*/
function getStartNode(val) {
    //console.log(val);
    switch (val) {
        case "USA":
            start = usa;
            break;
        case "CAN":
            start = canada;
            break;
        case "MEX":
            start = mexico;
            break;
        case "BLZ":
            start = belize;
            break;
        case "GTM":
            start = guatemala;
            break;
        case "SLV":
            start = elSalvador;
            break;
        case "HND":
            start = honduras;
            break;
        case "NIC":
            start = nicaragua;
            break;
        case "CRI":
            start = costaRica;
            break;
        case "PAN":
            start = panama;
            break;
        default:
            start = null;
    }
    return start;

}

/*-----------------------------------------------------------------
Description: Builds the path array from USA to the user's entered
            country

Parameters: start - TreeNode to start at and work the way back to USA
            pathArray - array to populate with the 3 character country
                        codes contained in the path from start to 
                        destination
            destination - TreeNode as the destination; in this problem,
                        answer will always be usa
-----------------------------------------------------------------*/
function calculatePath(start, pathArray, destination) {
    let goal = start;
    while(goal.parentNode != null) {
        pathArray.push(goal.value);
        goal = goal.parentNode;
    }
    pathArray.push(destination.value);
}

