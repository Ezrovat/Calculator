let a;
let b;
let precalcRes;
let operator;
let finalRes;

const OPERATOR_SIGN = {
    plus: "+",
    minus: "-",
    divide: "/",
    multiply: "x",
}

function operate(operation, a, b) {
    return operation(a,b);
}

function sum(a, b) {
    return +a + +b;
}

function substract(a,b) {
    return +a - +b;
}

function multiply(a,b) {
    return +a * +b;
}

function divide(a,b) {
    return +a / +b;
}

const aNode = document.querySelector("#a");
const bNode = document.querySelector("#b");
const operatorNode = document.querySelector("#operator");
const precalcNode = document.querySelector("#precalc-result");
const resultNode = document.querySelector("#res");

document.querySelectorAll(".digit").forEach(digit => digit.addEventListener("click", e => {
    const selectedDigit = e.target.textContent;

    if(!operator) {
        a = !a ?  selectedDigit : a + selectedDigit;
        precalcRes = null;
        finalRes = null
    } else {
        b = !b ? selectedDigit : b + selectedDigit;
        precalcRes = calcResult();
    }

    updateDisplay();
}));

document.querySelectorAll(".operand").forEach(opr => opr.addEventListener("click", e => {
    if(!a && !finalRes) return;
    const selectedOperandId = e.currentTarget.getAttribute("id");
    operator = operator ?? OPERATOR_SIGN[selectedOperandId];

    
    if(finalRes) {
        a = finalRes;
        finalRes = null;
    }

    if (b) {
        a = calcResult();
        b = null;
    }

    operator = OPERATOR_SIGN[selectedOperandId];
    updateDisplay();    
}));


document.querySelector("#canc").addEventListener("click", () => {
    a = null;
    b = null;
    operator = null;
    precalcRes = null;
    finalRes = null;
    updateDisplay();
});

document.querySelector("#equals").addEventListener("click", () => {
    if(!b) return;

    finalRes = calcResult();
    a = null;
    b = null;
    precalcRes = null;
    operator = null;
    updateDisplay();
});

document.querySelector("#floating").addEventListener("click", () => {
    if(b) {
        b = addFloatingPoint(b);
    } else {
        a = addFloatingPoint(a);
    }

    updateDisplay();
});

function addFloatingPoint(x) {
    return x.indexOf(".") == -1 ? x += "." : x;
}


function updateDisplay() {
    aNode.textContent = a;
    bNode.textContent = b;
    operatorNode.textContent = operator;
    precalcNode.textContent = precalcRes;
    resultNode.textContent = finalRes;
}

function calcResult() {
    let result = 0;

    switch (operator) {
        case "plus":
        case "+":
            result = operate(sum, a, b);
            break;

        case "minus":
        case "-":
            result = operate(substract, a, b);
            break;

        case "multiply":
        case "x":
            result = operate(multiply, a, b);
            break;

        case "divide":
        case "/":
            result = operate(divide, a, b);
            break;

        default:
            console.log("Operatore non valido");
            break;
    }

    return result;
}






