
//Selecting slider
const gridSlider = document.querySelector("#slider");

//Selecting color picker
const colorPicker = document.querySelector("#color-picker");
var paintMode = 0; //color mode by default

var currentColor = colorPicker.value;

const rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var currentRainbowColor = 0;

var currentShadowColor = "rgb(255, 255, 255)";

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

  function generateRandomRGB() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  function generateRainbowColor() {
    return rainbowColors[currentRainbowColor];
  }

  function addBlack() {
    // Get the current RGB values
    var colors = currentShadowColor.match(/\d+/g);
  
    // Decrease the RGB values by 90%
    var newRGB = colors.map(function(color) {
      return Math.round(color * 0.9);
    });
  
    // Update the currentShadowColor variable with the new RGB values
    currentShadowColor = "rgb(" + newRGB.join(", ") + ")";
  
    // Check if all the color values are less than or equal to 5
    if(colors.every(function(color) {
      return color <= 5;
    })) {
      // If all the color values are less than or equal to 5, reset the color to white
      currentShadowColor = "rgb(255, 255, 255)";
    }
  }

  function paintColorMode(div) {
    div.style.backgroundColor = currentColor;
  }
  
  function paintRandomMode(div) {
    div.style.backgroundColor = generateRandomRGB();
  }
  
  function paintRainbowMode(div) {
    div.style.backgroundColor = generateRainbowColor();
    currentRainbowColor = (currentRainbowColor == (rainbowColors.length-1)) ? 0 : currentRainbowColor+1;
  }
  
  function paintShadowMode(div) {
    div.style.backgroundColor = currentShadowColor;
    addBlack();
  }

  function paint(div) {
    switch (paintMode) {
      case 0: paintColorMode(div); break;
      case 1: paintRandomMode(div); break;
      case 2: paintRainbowMode(div); break;
      case 3: paintShadowMode(div); break;
    }
  }

function addMouseListeners(gridDiv) {
    gridDiv.addEventListener("click", (e) => {
      paint(gridDiv);
      });
    
    //Add hover event
    gridDiv.addEventListener("mouseover", (e) => {
        if (e.buttons === 1) {
          paint(gridDiv);
        }
    });  
}

function buildColorPicker() {
  updateColor(colorPicker.value);
  colorPicker.addEventListener('input', (event) => {
    updateColor(event.target.value);
});


buildSettingsButtons();

function buildSettingsButtons() {
  const buttons = [colorButton, randomButton, rainbowButton, shadowButton];

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      buttons.forEach(function(btn) {
        btn.classList.remove("toggled");
      });
      button.classList.add("toggled");
      paintMode = buttons.indexOf(button);
    });
  });
}

function updateColor(color) {
  currentColor = color;
  colorPicker.style.backgroundColor = color;
  colorPicker.style.borderColor = color;
}


 
/**
 * To Do's: 
 * - Implement painting modes
 * - Implement eraser, like coloring but with color white
 * - Clear canvas -> sets background color of all grid divs to white
 * - Style slider
 * - Implement slider input listener, clears and recalculates grid
 * - Add a toggle that activates the grid having individual pixel delimitation
 * - This should be able to be activated by user
 * - Activated when changing grid's dimensions -> deactivated upon starting to draw (not if the toggle is currently user-activated)
 * - Make mouse icon change when in grid space
 */
  
}

