
//Selecting slider
const gridSlider = document.querySelector("#slider");

//Selecting color picker
const colorPicker = document.querySelector("#color-picker");

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
  
  

