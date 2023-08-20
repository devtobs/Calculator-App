'use strict';

// Selecting elements
const result = document.querySelector('.result');
const input = document.querySelector('.input');

const figure = document.querySelectorAll('.figure');
const clear = document.querySelector('.all-clear');
const leftArrow = document.querySelector('.left-arrow');
const pnToggle = document.querySelector('.positive-negative-toggle');
const period = document.querySelector('.period');

const percentage = document.querySelector('.percentage');
const division = document.querySelector('.division');
const multiplication = document.querySelector('.multiplication');
const subtraction = document.querySelector('.subtraction');
const addition = document.querySelector('.addition');
const equality = document.querySelector('.equality');

let calcStr, inputString;

// Starting conditions
const init = function () {
  result.textContent = 0;
  input.value = '';
  calcStr = '';
  inputString = '';
  result.classList.remove('error');
};
init();

const appendTo = function (str) {
  // Appending to display inputed string
  if (str === '÷' || str === '×' || str === '-' || str === '+') {
    inputString += ' ' + str + ' ';
  } else {
    inputString += str;
  }
  input.value = inputString;

  // Appending to variable string to be calculated
  if (str === '÷') {
    calcStr += ' ' + '/' + ' ';
  } else if (str === '×') {
    calcStr += ' ' + '*' + ' ';
  } else if (str === '%') {
    calcStr += '/100';
  } else if (str === '+' || str === '-') {
    calcStr += ' ' + str + ' ';
  } else {
    calcStr += str;
  }
};

// Setting functionality
for (let i = 0; i < figure.length; i++) {
  figure[i].addEventListener('click', function () {
    appendTo(figure[i].textContent);
  });
}

percentage.addEventListener('click', function () {
  appendTo('%');
});

division.addEventListener('click', function () {
  appendTo('÷');
});

multiplication.addEventListener('click', function () {
  appendTo('×');
});

subtraction.addEventListener('click', function () {
  appendTo('-');
});

addition.addEventListener('click', function () {
  appendTo('+');
});

period.addEventListener('click', function () {
  appendTo('.');
});

pnToggle.addEventListener('click', function () {
  // SETTING TOGGLE FUNCTIONALITY FOR INPUTED STRING
  // 1. Selecting element to be toggled
  const arrInput = inputString.split(' ');
  let valueInput = arrInput[arrInput.length - 1];
  // 2. Checking if element has been toggled before
  if (valueInput[0] === '-') {
    valueInput = valueInput.split('');
    valueInput[0] = '';
    valueInput = valueInput.join('');
  } else {
    valueInput = '-' + valueInput;
  }
  // 3. Toggling element
  arrInput[arrInput.length - 1] = valueInput;
  inputString = arrInput.join(' ');
  input.value = inputString;

  // SETTING TOGGLE FUNCTIONALITY FOR STRING TO BE CALCULATED
  // 1. Selecting element to be toggled
  const arrCalc = calcStr.split(' ');
  let valueCalc = arrCalc[arrCalc.length - 1];
  // 2. Checking if element has been toggled before
  if (valueCalc[0] === '-') {
    valueCalc = valueCalc.split('');
    valueCalc[0] = '';
    valueCalc = valueCalc.join('');
  } else {
    valueCalc = '-' + valueCalc;
  }
  // 3. Toggling element
  arrCalc[arrCalc.length - 1] = valueCalc;
  calcStr = arrCalc.join(' ');
});

leftArrow.addEventListener('click', function () {
  // Deleting last element of string to be calculated
  if (inputString[inputString.length - 1] === '%') {
    calcStr = calcStr.slice(0, -4);
  } else {
    calcStr = calcStr.slice(0, -1);
  }

  // Deleting last element of inputed string
  inputString = inputString.slice(0, -1);
  input.value = inputString;
});

equality.addEventListener('click', function () {
  // Attempting to evaluate mathematical expression and handle ERRORS!
  try {
    // Evaluating mathematical expression
    result.textContent = eval(calcStr);
  } catch {
    // Displaying a user-friendly error message on the webpage
    result.textContent = 'syntax error';
    result.classList.add('error');
  }
});

clear.addEventListener('click', init);
