let currentInput = '';
let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let solution = '';

const display = document.getElementById('display');

function appendToDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function setOperator(operator) {
    if (currentInput !== '' && currentInput !== '.') {
        if (firstOperand === '' && currentOperator === '') {
            firstOperand = currentInput;
            currentOperator = operator;
            currentInput = '';
        } else if (firstOperand !== '' && currentOperator !== '' && currentInput !== '') {
            secondOperand = currentInput;
            solution = operate(currentOperator, firstOperand, secondOperand);
            firstOperand = solution;
            currentOperator = operator;
            currentInput = '';
        }
    }
}

function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return 'Error';
            }
        default:
            return 'Error';
    }
}

function calculate() {
    if (currentOperator !== '' && firstOperand !== '' && currentInput !== '') {
        secondOperand = currentInput;
        solution = operate(currentOperator, firstOperand, secondOperand);
        display.value = solution.toFixed(2);
        currentInput = solution.toFixed(2);
        firstOperand = '';
        secondOperand = '';
        currentOperator = '';
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (/[0-9.]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    }
});
