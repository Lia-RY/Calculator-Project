let currentInput = '';
let lastInput = '';
let firstOperand = '';
let secondOperand = '';
let currentOperator = '';
let currentOperationDisplay = '';
let solution = '';

const display = document.getElementById('display');
const operationDisplay = document.getElementById('operation-display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const value = button.dataset.value;
        const operator = button.dataset.operator;
        const action = button.dataset.action;

		if (value !== undefined) {
			appendToDisplay(value);
			lastInput = '';
		}
		if (operator !== undefined) {
			setOperator(operator);
			lastInput = '';
		}
		if (action === 'backspace') {
			backspace();
			lastInput = '';
		} 
		else if (action === 'clear') {
			clearDisplay();
			lastInput = '';
		}
		else if (action === 'calculate') {
			calculate();
			lastInput = 'calculate';
		}
    });
});


function appendToDisplay(value) {
	if (lastInput == 'calculate') {
		currentInput = '';
		currentOperationDisplay = '';
	}
    if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (currentInput !== '') {
            calculate();
        }
        currentOperationDisplay += ` ${value}`;
    } 
    else if (value === '.') {
        if (!currentInput.includes('.')) {
            currentInput += value;
            currentOperationDisplay += value;
        }
    }
    else {
        currentInput += value;
        currentOperationDisplay += value;
    }

    display.value = currentInput;
    operationDisplay.value = currentOperationDisplay;
}


function clearDisplay() {
    currentInput = '';
    display.value = '';
    currentOperationDisplay = '';
    operationDisplay.value = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    currentOperationDisplay = currentOperationDisplay.slice(0, -1);
    operationDisplay.value = currentOperationDisplay;
}

function setOperator(operator) {
    if (currentInput !== '' && currentInput !== '.') {
        if (firstOperand === '' && currentOperator === '') {
            firstOperand = currentInput;
            currentOperator = operator;
            currentInput = '';
            currentOperationDisplay += ` ${operator} `;
            display.value = currentInput;
            operationDisplay.value = currentOperationDisplay;
        } else if (firstOperand !== '' && currentOperator !== '' && currentInput !== '') {
            secondOperand = currentInput;
            solution = operate(currentOperator, firstOperand, secondOperand);
            firstOperand = solution;
            currentOperator = operator;
            currentInput = '';
            currentOperationDisplay = `${solution} ${operator} `;
            display.value = currentInput;
            operationDisplay.value = currentOperationDisplay;
        }
    }
}


function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+':
            return num1 + num2;
			break;
        case '-':
            return num1 - num2;
			break;
        case '*':
            return num1 * num2;
			break;
        case '/':
            if (num2 !== 0) {
				return num1 / num2;
            } else {
                return 'Error';
            }
			break;
        default:
            return 'Error';
    }
}

function calculate() {
    if (currentOperator !== '' && firstOperand !== '' && currentInput !== '') {
        secondOperand = currentInput;
        solution = operate(currentOperator, firstOperand, secondOperand);
        // display.value = solution.toFixed(2);
        // currentInput = solution.toFixed(2);
        display.value = solution;
        currentInput = solution;
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
