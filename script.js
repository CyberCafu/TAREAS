    let currentInput = '0';
    let previousInput = '';
    let operation = null;

    const currentDisplay = document.getElementById('current-operand');
    const previousDisplay = document.getElementById('previous-operand');

    function updateDisplay() {
      currentDisplay.innerText = currentInput;
      if (operation != null) {
        previousDisplay.innerText = `${previousInput} ${getOperatorSymbol(operation)}`;
      } else {
        previousDisplay.innerText = '';
      }
    }

    function getOperatorSymbol(op) {
      if (op === '*') return '×';
      if (op === '/') return '÷';
      return op;
    }

    function appendNumber(number) {
      if (number === '.' && currentInput.includes('.')) return;
      if (currentInput === '0' && number !== '.') {
        currentInput = number;
      } else {
        currentInput += number;
      }
      updateDisplay();
    }

    function appendOperator(op) {
      if (currentInput === '' && previousInput === '') return;
      if (previousInput !== '') {
        calculate();
      }
      operation = op;
      previousInput = currentInput;
      currentInput = '';
      updateDisplay();
    }

    function calculate() {
      let computation;
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);

      if (isNaN(prev) || isNaN(current)) return;

      switch (operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '/':
          computation = current === 0 ? 'Error' : prev / current;
          break;
        case '%':
          computation = prev % current;
          break;
        default:
          return;
      }

      currentInput = computation.toString();
      operation = null;
      previousInput = '';
      updateDisplay();
    }

    function clearDisplay() {
      currentInput = '0';
      previousInput = '';
      operation = null;
      updateDisplay();
    }

    function deleteDigit() {
      if (currentInput.length === 1 || currentInput === 'Error') {
        currentInput = '0';
      } else {
        currentInput = currentInput.slice(0, -1);
      }
      updateDisplay();
    }
