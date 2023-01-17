const MAX_TEXT_LENGTH = 20;
var currentNumber = NaN;
var leftOperand = 0;
var rightOperand = NaN;
var result = NaN;
var operator = null;

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
        default:
            alert("Invalid operator!");
    }
}

function operatorClickCB() {
    
}

function numberClickCB(e, display) {
    if (rightOperand === NaN) {
        rightOperand = 0;
    }
    if (display.textContent.length <= MAX_TEXT_LENGTH) {
        currentNumber = currentNumber * 10 + +e.target.value;
        display.textContent = currentNumber;
    }
}


/* --------- main --------- */
const displayh1 = document.querySelector(".display h1");
const numbersContainer = document.querySelector(".numbers");
const operatorContainer = document.querySelector(".operators");
numbersContainer.childNodes.forEach((n) => n.addEventListener("click", (x)=>numberClickCB(x, displayh1)));
operatorContainer.childNodes.forEach((n) => n.addEventListener("click", (x)=>operatorClickCB))




/*
click numbers, add to currentNumber
press operator, save number to savedNumber, save operator
enter new number or change operator
press equals or another operator to calculate, potentially enter another number
*/