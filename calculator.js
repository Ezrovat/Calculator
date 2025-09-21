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

    handlButtonPress(selectedDigit);
}));

document.addEventListener("keydown", event => {
    if(!Number.isNaN(+event.key) || event.key === ".") handlButtonPress(event.key);
    
    if(["x","+","-","/"].includes(event.key)) {
        operator = event.key;
        handleOperandPress();
        updateDisplay();
    }

    if(["=","Enter"].includes(event.key)) calcFinalResult();

    if("Backspace" === event.key) {
        del();
    }

    console.log(event.key)
});



document.querySelectorAll(".operand").forEach(opr => opr.addEventListener("click", e => {
    if(!a && !finalRes) return;

    const selectedOperandId = e.currentTarget.getAttribute("id");
    operator = operator ?? OPERATOR_SIGN[selectedOperandId];

    handleOperandPress();
    
    operator = OPERATOR_SIGN[selectedOperandId];
    updateDisplay();    
}));


function handleOperandPress() {
    if(finalRes) {
        a = finalRes;
        finalRes = null;
    }

    if (b) {
        a = calcResult();
        b = null;
    }
}


document.querySelector("#canc").addEventListener("click", () => clear());

function clear() {
    a = null;
    b = null;
    operator = null;
    precalcRes = null;
    finalRes = null;
    updateDisplay();
}

document.querySelector("#equals").addEventListener("click", () => calcFinalResult());

function calcFinalResult() {
    if(!b) return;

    finalRes = calcResult()
    a = null;
    b = null;
    precalcRes = null;
    operator = null;
    updateDisplay();
}

document.querySelector("#floating").addEventListener("click", () => {
    if(b) {
        b = addFloatingPoint(b);
    } else {
        a = addFloatingPoint(a);
    }

    updateDisplay();
});

document.querySelector("#del").addEventListener("click", () => del());

function del() {
    if (b) {
        b = cancLastDigit(b);
    } else if (!operator) {
        a = cancLastDigit(a);
    }
    updateDisplay();
}

function cancLastDigit(x) {
    return x.slice(0, x.length-1);
}

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

function handlButtonPress(selectedDigit) {
    console.log(selectedDigit)
    if(!operator) {
        a = !a ?  selectedDigit : a + selectedDigit;
        precalcRes = null;
        finalRes = null
    } else {
        b = !b ? selectedDigit : b + selectedDigit;
        precalcRes = calcResult();
    }

    updateDisplay();
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






