const MAX_TEXT_LENGTH = 20;
const PRECISION = 14;
var currentNumber = NaN;
var leftOperand = NaN;
var rightOperand = NaN;
var result = NaN;
var operator = null;
var savedOperator = null;
var decimalExp = 0;

function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function operate(op, x, y) {
    switch (op) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
        case "null":
            return x;
        default:
            alert("Invalid operator!");
    }
}

function operatorClickCB(e, container, display) {
    operatorClick(e.target.value, container, display);
    e.target.classList.add("highlight");
}
function operatorClickKB(value, container, display) {
    operatorClick(value, container, display);
    var op;
    switch(value) {
        case "+": op = "addition"; break;
        case "-": op = "subtraction"; break;
        case "*": op = "multiplication"; break;
        case "/": op = "division"; break;
        case "=": op = "equals"; break;
    }
    document.getElementById(op).classList.add("highlight");
}
function operatorClick(value, container, display) {
    // Clear highlighted buttons.
    let opButtons = Array.from(container.children);
    opButtons.forEach((n)=>n.classList.remove("highlight"));
    // Set up operands
    if (isNaN(leftOperand)) {
        if (value !== "="){
            leftOperand = isNaN(currentNumber) ? 0 : currentNumber;
            operator = value;
            currentNumber = NaN;
            savedOperator = operator;
        }
    } else {
        // Special Case: Divide by zero Snark
        if (operator == "/" && currentNumber == 0) {
            clear();
            display.textContent = "Divide by Zero? Aiyahhh"
            return;
        }
        // If pressing operator without entering a number
        if (isNaN(currentNumber)) {
            // If "=": repeating an operation
            if (value === "=" && !isNaN(rightOperand)) {
                result = operate(savedOperator, leftOperand, rightOperand);
                updateDisplay(result, display);
                leftOperand = result;
                currentNumber = NaN;
            } 
            // Switching operators
            else { 
                operator = value;
            }

        } else { // Normal operation
            rightOperand = currentNumber;
            result = operate(operator, leftOperand, rightOperand);
            updateDisplay(result, display);
            leftOperand = result;
            currentNumber = NaN;
            if (value !== "="){
                operator = value;
                savedOperator = operator;
            }
            else {
                savedOperator = operator;
                operator = null;
            };
        }
    }    
}

function numberClickCB(e, display) {
    numberClick(e.target.value, display);
}
function numberClick(valueAsStr, display) {
    // TODO: FIX HOW MANY DIGITS ALLOWED
    if (isNaN(currentNumber)) {
        if (!operator) {
            clear();
        }
        currentNumber = 0;
        decimalExp = 0;
    }
    if (valueAsStr == ".") {
        if (decimalExp === 0) {
            decimalExp -= 1;
            updateDisplay(currentNumber, display);
        }
        return;
    }
    if (decimalExp) {
        currentNumber = currentNumber + (+valueAsStr * 10**decimalExp);
        updateDisplay(currentNumber, display);
        decimalExp -= 1;
    }
    else {
        currentNumber = currentNumber * 10 + +valueAsStr;
        updateDisplay(currentNumber, display);
    }
}

function updateDisplay(number, display, precision=PRECISION) {
    display.textContent = Math.floor(number * (10 ** precision)) / (10 ** precision);
    if (decimalExp !== 0 && Number.isSafeInteger(currentNumber)) {
        display.textContent += ".";
    }
}

function clear() {
    currentNumber = NaN;
    leftOperand = NaN;
    rightOperand = NaN;
    result = NaN;
    operator = null;
    savedOperator = null;
    decimalExp = 0;
}
function clearClickCB(display, operatorContainer) {
    clear();
    updateDisplay(0, display);
    let opButtons = Array.from(operatorContainer.children);
    opButtons.forEach((n)=>n.classList.remove("highlight"));
}

function backspaceClickCB(display) {
    if (isNaN(currentNumber)) {
        clear();
        updateDisplay(0, display);
        return;
    }
    if (currentNumber === 0) return;

    if (decimalExp !== 0) {
        decimalExp += (Number.isSafeInteger(currentNumber)) ? 1 : 2;
        decimalExp = (decimalExp > 0) ? 0 : decimalExp;
        currentNumber = currentNumber * (10**(-decimalExp));
        currentNumber = Math.floor(currentNumber);
        currentNumber = currentNumber * (10**decimalExp);
    }
    else {
        currentNumber /= 10;
        currentNumber = Math.floor(currentNumber);
    }
    updateDisplay(currentNumber, display);
}

//https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
function keydownCB(evnt, operatorContainer, display) {
    evnt.preventDefault();
    var key = evnt.key;
    switch (key) {
        case "0": case "1": case "2": case "3": case "4": 
        case "5": case "6": case "7": case "8": case "9":
            const numButton = document.getElementById(`number${key}`);
            numButton.classList.add("highlight");
            numberClick(key, display);
            break;
        case "+": case "-": case "*": case "/": case "=":
            operatorClickKB(key, operatorContainer, display);
            break;
        case "Enter":
            operatorClickKB("=", operatorContainer, display);
            break;
        case "Backspace":
            backspaceClickCB(display);
            break;
        case "Delete":
            clearClickCB(display, operatorContainer);
            break
        default:
            break;
    }
}
function keyUpCB(evnt, numbersContainer, operatorContainer, display) {
    evnt.preventDefault();
    var key = evnt.key;

    let numButtons = Array.from(numbersContainer.children);
    numButtons.forEach((n)=>n.classList.remove("highlight"));
}


/* --------- main --------- */
const displayh1 = document.querySelector(".display h1");
const numbersContainer = document.querySelector(".numbers");
const operatorContainer = document.querySelector(".operators");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
numbersContainer.childNodes.forEach((n) => n.addEventListener("click", (x)=>numberClickCB(x, displayh1)));
operatorContainer.childNodes.forEach((n) => n.addEventListener("click", (x)=>operatorClickCB(x, operatorContainer, displayh1)))
clearButton.addEventListener("click", ()=>clearClickCB(displayh1, operatorContainer));
backspaceButton.addEventListener("click", ()=>backspaceClickCB(displayh1));


document.addEventListener("keydown", (x)=>keydownCB(x, operatorContainer, displayh1));
document.addEventListener("keyup", (x)=>keyUpCB(x, numbersContainer, operatorContainer, displayh1));


/*
click numbers, add to currentNumber
press operator, save number to savedNumber, save operator
enter new number or change operator
press equals or another operator to calculate, potentially enter another number
*/