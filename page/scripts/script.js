
//Selecting slider
const viewGridToggle = document.querySelector("#toggle");

const sizeLabel = document.querySelector("#size-label");
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

  function erase(div) {
    div.style.backgroundColor = "white";
  }

  function paint(div) {
    switch (paintMode) {
      case 0: paintColorMode(div); break;
      case 1: paintRandomMode(div); break;
      case 2: paintRainbowMode(div); break;
      case 3: paintShadowMode(div); break;
      case 4: erase(div); break;
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
  const buttons = [colorButton, randomButton, rainbowButton, shadowButton, eraserButton];

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

function buildClearButton() {
  clearButton.addEventListener("click", () => {
    Array.from(gridSpace.children).forEach(gridDiv => {
      erase(gridDiv);
    })  
    clearButton.classList.add("toggled");
  });

  clearButton.addEventListener("transitionend", () => {
    clearButton.classList.remove("toggled");
  });
}

buildClearButton();
buildSlider();

function buildSlider() {
  updateSizeLabel();

  gridSlider.addEventListener("input", function(){
    gridSize = this.value;
    updateSizeLabel();
    clearGrid();
    buildGrid();
  });
}

function updateSizeLabel() {
  sizeLabel.innerHTML = `${gridSize}x${gridSize}`;
}

function clearGrid() {
  while (gridSpace.firstChild) {
    gridSpace.removeChild(gridSpace.firstChild);
  }
}

function addBorders() {
  Array.from(gridSpace.children).forEach(gridDiv => {
    gridDiv.classList.add("borderedDiv");
  }); 
}

function removeBorders() {
  Array.from(gridSpace.children).forEach(gridDiv => {
    gridDiv.classList.remove("borderedDiv");
  });
}

buildToggle();

function buildToggle() {
  viewGridToggle.addEventListener("change", function() {
    if (this.checked) {
        addBorders();
    } else {
        removeBorders();
    }
});
}

/**
 * To Do's:   
 * - Make mouse icon change when in grid space
 */
  
}

