let a;
let b;
let operator;

function operate(operation, a, b) {
    return operation(a,b);
}

function sum(a, b) {
    return a+b;
}

function substract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

document.querySelectorAll(".digit").forEach(digit => digit.addEventListener("click", e => {
    const selectedDigit = e.target.textContent;
    if(!operator) {
        a = !a ? selectedDigit : a + selectedDigit;
    }
    else {
        b = !b ? selectedDigit : b + sele;
    }

    updateDisplay();

    console.log(a +  " " +  b);
}));

function updateDisplay() {

}






