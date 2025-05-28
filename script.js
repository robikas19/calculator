const display = document.getElementById("display");

// Append character to display
function append(value) {
  display.value += value;
}

// Clear entire display
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteChar() {
  display.value = display.value.slice(0, -1);
}

// Keyboard support
document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    append(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteChar();
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});

// Scientific functions
Math.factorial = function(n) {
  if (n < 0) throw new Error("Factorial of negative number");
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

Math.ln = function(x) {
  return Math.log(x);
};

// Expression evaluator using math.js
function calculate() {
  try {
    let expression = display.value;

    // Replace shorthand factorial: 5! → factorial(5)
    expression = expression.replace(/(\d+)!/g, 'factorial($1)');
    
    // Replace ^ with pow operator for math.js
    expression = expression.replace(/\^/g, '**');

    // Evaluate using math.js
    const result = math.evaluate(expression);

    if (result === undefined || isNaN(result)) {
      throw new Error("Invalid expression");
    }

    // Format large/small numbers to fixed precision
    display.value = typeof result === 'number' ? parseFloat(result.toFixed(10)) : result;
  } catch (error) {
    display.value = "Error";
  }
}