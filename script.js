const MAX_TEXT_LENGTH = 20;
var firstNumber = NaN;
var currentNumber = NaN;

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
            add(x, y);
            break;
        case "-":
            subtract(x, y);
            break;
        case "*":
            multiply(x, y);
            break;
        case "/":
            divide(x, y);
            break;
        default:
            alert("Invalid operator!");
    }
}

function numberClickCB(e, display) {
    if (display.textContent.length <= MAX_TEXT_LENGTH) {
        currentNumber = currentNumber * 10 + +e.target.value;
        display.textContent = currentNumber;
    }
}


/* --------- main --------- */
const displayh1 = document.querySelector(".display h1");
const numbersContainer = document.querySelector(".numbers");
numbersContainer.childNodes.forEach((n) => n.addEventListener("click", (x)=>numberClickCB(x, displayh1)));

currentNumber = 0;

