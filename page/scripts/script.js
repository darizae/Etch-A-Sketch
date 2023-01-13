
//Selecting slider
const gridSlider = document.querySelector("#slider");

//Selecting color picker
const colorPicker = document.querySelector("#color-picker");
var currentColor = colorPicker.value;

//Selecting settings section buttons
const colorButton = document.querySelector("#color-button");
const randomButton = document.querySelector("#random-button");
const rainbowButton = document.querySelector("#rainbow-button");
const shadowButton = document.querySelector("#shadow-button");

//Selecting Erasing sections buttons
const eraserButton = document.querySelector("#eraser-button");
const clearButton = document.querySelector("#clear-button");

//Selecting grid
const gridSpace = document.querySelector("#grid");

//Default grid size is 16x16
var gridSize = gridSlider.value;

buildGrid();
buildColorPicker();

function buildGrid() {
  
    // Set the grid template columns and rows
    gridSpace.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridSpace.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    // Assign the number of columns and rows to the grid container element based on the gridSize variable
  
    // Create the grid items
    for (var i = 0; i < (gridSize**2); i++) {
      var newDiv = document.createElement("div");
      newDiv.classList.add("gridDiv");
      addMouseListeners(newDiv)

      gridSpace.appendChild(newDiv);
      // create new divs and added to the element gridSpace as children, the class of the divs is "gridDiv"
    }
  }

function addMouseListeners(gridDiv) {
    gridDiv.addEventListener("click", (e) => {
        gridDiv.classList.add("colored-div");
      });
    
    //Add hover event
    gridDiv.addEventListener("mouseover", (e) => {
        console.log("mouse hover");
        if (e.buttons === 1) {
            gridDiv.classList.add("colored-div");
        }
    });  
}

function buildColorPicker() {
  updateColor(colorPicker.value);
  colorPicker.addEventListener('input', (event) => {
    updateColor(event.target.value);
});

function updateColor(color) {
  currentColor = color;
  colorPicker.style.backgroundColor = color;
  colorPicker.style.borderColor = color;
}
/**
 * To Do's:
 * - Style color picker, preferably to a circle
 * - Get value of color picker in JS
 * - Refactor so color assignment is done from a variable in script, remove CSS rule    for coloring
 * - Keep colored-class there for future use
 * - Create numerical values for each coloring mode
 * - Based on selected button, a variable is assigned the button's corresponding int
 * - Current assigning color should be equal to color picker's value by default (0)
 * - Upon newDiv creation (make its own function), the assigned background color style depends on the current variable, depending on it a switch function calls the function that generates that color
 * - Make mouse icon change when in grid space
 * - Implement eraser, like coloring but with color white
 * - Clear canvas -> sets background color of all grid divs to white
 * - Style slider
 * - Implement slider input listener, clears and recalculates grid
 * - Add a toggle that activates the grid having individual pixel delimination
 * - This should be able to be activated by user
 * - Activated when changing grid's dimensions -> deactivated upon starting to draw (not if the toggle is currently user-activated)
 */
  
}

