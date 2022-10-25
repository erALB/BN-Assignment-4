const add = (x, y) => x/1 + y/1;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const powerOf = (x, y) => x ** y;
const MAX_DIGITS = 10; // Number of digits that can be inputted (output can be larger than 10 digits)

function divide(x, y) {
  if (x != 0 && y == 0) return " ";
  return x / y;
}

function operate(operator, x, y) {
  var result;
  switch(operator) {
    case "add":
      result = add(x, y);
      break;
    case "subtract":
      result = subtract(x, y);
      break;
    case "multiply":
      result = multiply(x, y);
      break;
    case "powerOf":
      result = powerOf(x, y);
      break;
    default:
      result = divide(x, y);
      break;
  }
  return result;
}

var first;
var operation;
var second;
var result;
var evaluated = false; // Used to reset the first value when typing after pressing "="
var currentNumber = true; // True for first, false for second

var output = document.getElementById("output");
var numberButtons = document.getElementsByClassName("number");
var operatorButtons = document.getElementsByClassName("operator");
var divideByZero = document.getElementById("impossible");

var thanos = document.createElement("img");
thanos.setAttribute("src", "impossible.png");
thanos.setAttribute("height", "350");

document.getElementById("clear").addEventListener("click", allClear);
document.getElementById("sign").addEventListener("click", changeSign);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("decimalPoint").addEventListener("click", addDecimalPoint)
document.getElementById("equals").addEventListener("click", evaluate);

window.addEventListener("keydown", function(e) {
  const keyToPress = document.querySelector(`div[data-key='${e.key}']`)
  keyToPress.click();
});

function display(number) {
  output.innerHTML = number;
}

function allClear() {
  first = undefined;
  second = undefined;
  output.innerHTML = 0;
}

function changeSign() {
  if (currentNumber) {
    first *= -1;
    display(first);
  } else {
    second *= -1;
    display(second);
  }
}

function hasNumber(number) {
  return /\d/.test(number.toString());
}

function backspace() {
  if (currentNumber) {
    first = first.toString().slice(0, -1);
    if (hasNumber(first)) display(first);
    else display(0);
  } else {
    second = second.toString().slice(0, -1);
    if (hasNumber(second)) display(second);
    else display(0);
  }
}

function addDecimalPoint() {
  if (currentNumber) {
    if (first == undefined || evaluated) { 
      first = "0.";
      evaluated = false;
    } else {
      if (!first.toString().includes(".")) {
        first += this.innerHTML;
      }
    }
    display(first);
  } else {
    if (!second.toString().includes(".")) {
      second += this.innerHTML;
      display(second);
    }
  }
}

function addValue() { 
  if (currentNumber) {
    if (first == undefined || evaluated) { 
      first = this.innerHTML;
      evaluated = false;
    } else if(first.toString().length <= MAX_DIGITS) first += this.innerHTML;
    display(first);
  } else {
    if (second == undefined) second = this.innerHTML;
    else if(second.toString().length <= MAX_DIGITS) second += this.innerHTML;
    display(second);
  }
}

function storeValue() { 
  operation = this.id;
  currentNumber = false;
  evaluate();
}

function evaluate() {
  var result;
  if (first != undefined && second != undefined) {
    console.log(operation);
    result = operate(operation, first, second)
    if (result.toString().length > MAX_DIGITS && !result.toString().includes("e") && result > powerOf(10, 10)) {
      display(divide(result, powerOf(10, (result.toString().length-1))).toFixed(2) + "e+"+(result.toString().length-1)); // Display very large numbers (10+ digits) with e-notation
    } else display(result);
    if (result.toString().includes(" ")) { // When dividing by zero
      divideByZero.appendChild(thanos);
    }
    operation = undefined;
    first = result;
    second = undefined;
    currentNumber = true;
    evaluated = true;
  }
}

for(var i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", addValue);
}

for(var i = 0; i < operatorButtons.length; i++) {
  operatorButtons[i].addEventListener("click", storeValue);
}