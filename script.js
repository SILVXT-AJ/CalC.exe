const display = document.getElementById("display");

// 1. Append character to display (number/operator buttons)
function appendToDisplay(char) {
    display.value += char;
}

// 2. Clear the screen (C button)
function clearDisplay() {
    display.value = "";
}

// 3. Delete last character (Backspace button)
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// 4. Calculate the result (= button)
function calculateResult() {
    try {
        // eval() is a built-in JS function that does the math for us automatically
        // e.g., eval("2 + 2") returns 4
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}