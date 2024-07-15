// Get elements
const inputField = document.querySelector(".input");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const functionButtons = document.querySelectorAll(".function");
const equalsButton = document.getElementById("equals");
const themeButton = document.querySelector(".theme img");

let currentInput = "";
let lastResult = "";
let isResultDisplayed = false;

// Update display
function updateDisplay(value) {
  inputField.value = value;
}

// Handle number button clicks (including decimal)
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isResultDisplayed) {
      currentInput = "";
      isResultDisplayed = false;
    }
    currentInput += button.textContent;
    updateDisplay(currentInput);
  });
});

// Handle operator button clicks
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isResultDisplayed) {
      isResultDisplayed = false;
    }
    // Ensure the current input is not empty before adding the operator
    if (currentInput !== "") {
      // Check if the last character is an operator, replace it if it is
      if (/[+\-*/]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1);
      }
      currentInput += button.textContent;
      updateDisplay(currentInput);
    }
  });
});

// Handle function button clicks
functionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const func = button.textContent;

    if (func === "DEL") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (func === "AC") {
      currentInput = "";
      updateDisplay(currentInput);
    } else if (func === "ANS") {
      currentInput += lastResult;
      updateDisplay(currentInput);
    }
  });
});

// Handle equals button click
equalsButton.addEventListener("click", () => {
  try {
    currentInput = currentInput.replace(/\^/g, "**");
    let result = eval(currentInput); // Evaluate expression
    lastResult = parseFloat(result.toFixed(10)); // Convert to float and fix to 10 decimal places
    updateDisplay(lastResult); // Update display
    currentInput = lastResult.toString(); // Update current input
    isResultDisplayed = true;
  } catch (error) {
    updateDisplay("Error"); // Display error if any
    currentInput = ""; // Clear current input
  }
});

// Handle theme switching
themeButton.addEventListener("click", () => {
  document.documentElement.classList.toggle("light-theme");
  if (document.documentElement.classList.contains("light-theme")) {
    themeButton.src = "moon.png"; // Change to moon icon in light theme
  } else {
    themeButton.src = "sun.png"; // Change to sun icon in dark theme
  }
});
