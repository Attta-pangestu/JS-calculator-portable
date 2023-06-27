// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the calculator elements
  var displayM = document.getElementById('displayM');
  var outputScr = document.getElementById('outputScr');
  var inputScr = document.getElementById('inputScr');
  var buttons = document.getElementById('buttons');

  // Add click event listener to the buttons container
  buttons.addEventListener('click', function(event) {
    var target = event.target;

    // Check if the clicked element is a button
    if (target.matches('div')) {
      var value = target.innerText;
      handleInput(value);
    }
  });

  // Add keyboard event listener to the document
  document.addEventListener('keydown', function(event) {
    var key = event.key;

    // Map keyboard keys to calculator buttons
    var keyMap = {
      'Enter': '=',
      'Escape': 'C',
      'Delete': 'CE',
      '%': '%',
      '/': '/',
      '*': '*',
      '+': '+',
      '-': '-',
      '.': '.',
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '6': '6',
      '7': '7',
      '8': '8',
      '9': '9',
    };

    // Check if the pressed key corresponds to a calculator button
    if (keyMap.hasOwnProperty(key)) {
      var value = keyMap[key];
      handleInput(value);
    }
  });

  // Function to handle calculator input
  function handleInput(value) {
    switch (value) {
      case '=':
        calculate();
        break;
      case 'C':
        clearAll();
        break;
      case 'CE':
        clearEntry();
        break;
      case '%':
        calculatePercentage();
        break;
      default:
        appendInput(value);
        break;
    }
  }

  // Function to append input to the input screen
  function appendInput(value) {
    var currentInput = inputScr.innerText;

    // Limit the number of digits before and after the decimal point
    if (currentInput.length < 10 && !(value === '.' && currentInput.includes('.'))) {
      inputScr.innerText = currentInput === '0' ? value : currentInput + value;
    }
  }

  // Function to calculate the result
  function calculate() {
    var expression = inputScr.innerText;

    try {
      var result = eval(expression);
      outputScr.innerText = expression + ' =';
      inputScr.innerText = result;
    } catch (error) {
      outputScr.innerText = 'Error';
      inputScr.innerText = '';
    }
  }

  // Function to clear the input and output screens
  function clearAll() {
    outputScr.innerText = '';
    inputScr.innerText = '0';
  }

  // Function to clear the last input
  function clearEntry() {
    inputScr.innerText = '0';
  }

  // Function to calculate the percentage
  function calculatePercentage() {
    var expression = inputScr.innerText;
    var parts = expression.split('%');

    if (parts.length === 2) {
      var percent = parseFloat(parts[0]) / 100;
      var number = parseFloat(parts[1]);
      var result = percent * number;
      outputScr.innerText = expression + ' =';
      inputScr.innerText = result;
    } else {
      outputScr.innerText = 'Error';
      inputScr.innerText = '';
    }
  }
});
