const screen = document.querySelector('.screen');
const calculationDisplay = document.querySelector('.calculation');
const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '0';         // Current number being entered
let firstOperand = null;        // First number in operation
let operator = null;            // Current operator (+, -, *, /)
let waitingForSecondOperand = false; // Flag for second number input
let isOn = false;               // Starts off

function calculate(first, op, second) {
    first = parseFloat(first);
    second = parseFloat(second);
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return second === 0 ? 'Error' : first / second;
    return 0;
}

function updateCalculationDisplay() {
    if (firstOperand !== null && operator !== null) {
        calculationDisplay.textContent = `${firstOperand} ${operator} ${currentInput || ''}`;
    } else {
        calculationDisplay.textContent = '';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'On') {
            isOn = !isOn; // Toggle on/off
            button.textContent=isOn?'OFF':'ON';
            if (isOn) {
                currentInput = '0';
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
                resultDisplay.textContent = '0';
                calculationDisplay.textContent = '';
            } else {
                resultDisplay.textContent = '';
                calculationDisplay.textContent = '';
            }
            return;
        }

        // Ignore clicks if calculator is off
        if (!isOn) return;

        if (value === 'C') {
            currentInput = '0';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            resultDisplay.textContent = '0';
            calculationDisplay.textContent = '';
        } 
        else if (value === 'DEL') {
            if (waitingForSecondOperand) return;
            currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
            resultDisplay.textContent = currentInput;
            updateCalculationDisplay();
        } 
        else if (value === '=') {
            if (firstOperand !== null && operator !== null && currentInput !== '') {
                const result = calculate(firstOperand, operator, currentInput);
                resultDisplay.textContent = result;
                calculationDisplay.textContent = `${firstOperand} ${operator} ${currentInput} =`;
                currentInput = result.toString();
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
            }
        } 
        else if (['+', '-', '*', '/'].includes(value)) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (currentInput !== '') {
                const result = calculate(firstOperand, operator, currentInput);
                resultDisplay.textContent = result;
                firstOperand = result;
            }
            operator = value;
            waitingForSecondOperand = true;
            currentInput = '';
            updateCalculationDisplay();
        } 
        else if (value === '.') {
            if (waitingForSecondOperand) {
                currentInput = '0.';
                waitingForSecondOperand = false;
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
            resultDisplay.textContent = currentInput;
            updateCalculationDisplay();
        } 
        else { // Numbers (0-9)
            if (waitingForSecondOperand) {
                currentInput = value;
                waitingForSecondOperand = false;
            } else if (currentInput === '0') {
                currentInput = value;
            } else {
                currentInput += value;
            }
            resultDisplay.textContent = currentInput;
            updateCalculationDisplay();
        }
    });
});