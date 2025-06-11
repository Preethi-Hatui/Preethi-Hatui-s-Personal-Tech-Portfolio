let history = [];

// Insert values into display
function insert(value) {
    document.getElementById("display").value += value;
}

// Clear display
function clearDisplay() {
    document.getElementById("display").value = "";
}

// Backspace (delete last character)
function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

// Calculate result
function calculate() {
    try {
        let expression = document.getElementById("display").value.replace(/\^/g, "**");
        let result = eval(expression);
        if (isNaN(result) || !isFinite(result)) throw "Math Error";
        history.push(document.getElementById("display").value + " = " + result);
        updateHistory();
        document.getElementById("display").value = result;
    } catch (error) {
        alert("Invalid Calculation");
        clearDisplay();
    }
}

// Exponentiation (x^y)
function power() {
    insert("^");
}

// Scientific Functions
function square() { insert("^2"); }
function cube() { insert("^3"); }
function exp() { insert("Math.exp("); }
function log() { insert("Math.log10("); }
function ln() { insert("Math.log("); }
function sqrt() { insert("Math.sqrt("); }
function sin() { insert("Math.sin("); }
function cos() { insert("Math.cos("); }
function tan() { insert("Math.tan("); }

// Factorial function (n!)
function factorial() {
    let num = parseInt(document.getElementById("display").value);
    let fact = 1;
    for (let i = 1; i <= num; i++) fact *= i;
    document.getElementById("display").value = fact;
}

// Toggle History Panel
function toggleHistory() {
    document.getElementById("history-panel").classList.toggle("hidden");
}

// Update History
function updateHistory() {
    document.getElementById("history").innerHTML = history.join("<br>");
}

// Clear History
function clearHistory() {
    history = [];
    updateHistory();
}

// Toggle Scientific Mode
function toggleScientific() {
    document.querySelector(".scientific-buttons").classList.toggle("hidden");
}
