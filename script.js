const MAX_TEXT_LENGTH = 20;
var currentNumber = NaN;
var leftOperand = NaN;
var rightOperand = NaN;
var result = NaN;
var operator = null;
var savedOperator = null;

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
    // Clear highlighted buttons.
    let opButtons = Array.from(container.children);
    opButtons.forEach((n)=>n.classList.remove("highlight"));
    e.target.classList.add("highlight");
    // Set up operands
    if (isNaN(leftOperand)) {
        if (e.target.value !== "="){
            leftOperand = isNaN(currentNumber) ? 0 : currentNumber;
            operator = e.target.value;
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
            if (e.target.value === "=" && !isNaN(rightOperand)) {
                result = operate(savedOperator, leftOperand, rightOperand);
                display.textContent = result;
                leftOperand = result;
                currentNumber = NaN;
            } 
            // Switching operators
            else { 
                operator = e.target.value;
            }

        } else { // Normal operation
            rightOperand = currentNumber;
            result = operate(operator, leftOperand, rightOperand);
            display.textContent = result;
            leftOperand = result;
            currentNumber = NaN;
            if (e.target.value !== "="){
                operator = e.target.value;
                savedOperator = operator;
            }
            else {
                operator = null;
            };
        }
    }    
}

function numberClickCB(e, display) {
    if (isNaN(currentNumber)) {
        if (!operator) {
            clear();
        }
        currentNumber = 0;
    }
    //if (display.textContent.length <= MAX_TEXT_LENGTH) {
        currentNumber = currentNumber * 10 + +e.target.value;
        display.textContent = currentNumber;
    //}
}

function clear() {
    currentNumber = NaN;
    leftOperand = NaN;
    rightOperand = NaN;
    result = NaN;
    operator = null;
    savedOperator = null;
}
function clearClickCB(display, operatorContainer) {
    clear();
    display.textContent = 0;
    let opButtons = Array.from(operatorContainer.children);
    opButtons.forEach((n)=>n.classList.remove("highlight"));
}


/* --------- main --------- */
const displayh1 = document.querySelector(".display h1");
const numbersContainer = document.querySelector(".numbers");
const operatorContainer = document.querySelector(".operators");
const clearButton = document.querySelector("#clear");
numbersContainer.childNodes.forEach((n) => n.addEventListener("click", (x)=>numberClickCB(x, displayh1)));
operatorContainer.childNodes.forEach((n) => n.addEventListener("click", (x)=>operatorClickCB(x, operatorContainer, displayh1)))
clearButton.addEventListener("click", ()=>clearClickCB(displayh1, operatorContainer));



/*
click numbers, add to currentNumber
press operator, save number to savedNumber, save operator
enter new number or change operator
press equals or another operator to calculate, potentially enter another number
*/