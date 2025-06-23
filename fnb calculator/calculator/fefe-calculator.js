  let currentInput = '0';
    let previousInput = null;
    let operator = null;
    let waitingForOperand = false;
    
    const display = document.getElementById('display');
    const errorElement = document.getElementById('error');
    
    function updateDisplay() {
      display.value = currentInput;
    }
    
    function clearError() {
      errorElement.textContent = '';
    }
    
    function showError(message) {
      errorElement.textContent = message;
    }
    
    function inputNumber(num) {
      clearError();
      
      if (waitingForOperand) {
        currentInput = num;
        waitingForOperand = false;
      } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
      }
      
      updateDisplay();
    }
    
    function inputOperator(nextOperator) {
      clearError();
      const inputValue = parseFloat(currentInput);
      
      if (previousInput === null) {
        previousInput = inputValue;
      } else if (operator) {
        const currentValue = previousInput || 0;
        const newValue = performCalculation(currentValue, inputValue, operator);
        
        if (newValue === null) return;
        
        currentInput = String(newValue);
        previousInput = newValue;
        updateDisplay();
      }
      
      waitingForOperand = true;
      operator = nextOperator;
    }
    
    function performCalculation(firstOperand, secondOperand, operator) {
      switch (operator) {
        case '+':
          return firstOperand + secondOperand;
        case '-':
          return firstOperand - secondOperand;
        case '*':
          return firstOperand * secondOperand;
        case '/':
          if (secondOperand === 0) {
            showError('Cannot divide by zero');
            return null;
          }
          return firstOperand / secondOperand;
        default:
          return secondOperand;
      }
    }
    
    function calculate() {
      clearError();
      const inputValue = parseFloat(currentInput);
      
      if (previousInput !== null && operator) {
        const newValue = performCalculation(previousInput, inputValue, operator);
        
        if (newValue === null) return;
        
        const roundedValue = Math.round(newValue * 100000000) / 100000000;
        
        currentInput = String(roundedValue);
        previousInput = null;
        operator = null;
        waitingForOperand = true;
        updateDisplay();
      }
    }
    
    function clearAll() {
      clearError();
      currentInput = '0';
      previousInput = null;
      operator = null;
      waitingForOperand = false;
      updateDisplay();
    }

    document.addEventListener('keydown', function(event) {
      const key = event.key;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        if (currentInput.indexOf('.') === -1) {
          inputNumber('.');
        }
      } else if (key === '+') {
        inputOperator('+');
      } else if (key === '-') {
        inputOperator('-');
      } else if (key === '*') {
        inputOperator('*');
      } else if (key === '/') {
        event.preventDefault();
        inputOperator('/');
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
      }
    });