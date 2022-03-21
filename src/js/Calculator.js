import { ERROR_MESSAGE, MAX_DIGITS, OPERATORS } from './constants.js';
import { $ } from './helpers.js';

const total = $('#total');
let isAlreadyTypeOperator = false;

export default function initializeCalculatorApp() {
  bindEvents();
}

function bindEvents() {
  $('#app').addEventListener('click', handleButtons.bind(this));
}

function handleButtons(event) {
  const { className } = event.target;

  switch (className) {
    case 'digit': {
      handleClickDigits(event);
      break;
    }
    case 'operation': {
      handleClickOperations(event);
      break;
    }
    case 'modifier': {
      handleClickAC(event);
      break;
    }
    default:
      break;
  }
}

function handleClickDigits(event) {
  const totalValue = total.textContent;
  const digitValue = event.target.textContent;

  if (checkOverMaxDigits(totalValue, digitValue)) {
    alert(ERROR_MESSAGE.OVER_THREE_DIGITS);
    return;
  }

  total.textContent = totalValue === '0' ? digitValue : totalValue + digitValue;
}

function handleClickOperations(event) {
  const totalValue = total.textContent;
  const operationValue = event.target.textContent;

  switch (operationValue) {
    case OPERATORS.EQUAL: {
      total.textContent = getCalculatedValue(totalValue);;
      isAlreadyTypeOperator = false;
      break;
    }
    case OPERATORS.ADD:
    case OPERATORS.DIVIDE:
    case OPERATORS.MULTIPLY:
    case OPERATORS.SUBTRACT: {
      if (isAlreadyTypeOperator) {
        total.textContent = getCalculatedValue(totalValue) + operationValue;
        isAlreadyTypeOperator = false;
      } else {
        isAlreadyTypeOperator = true;
        total.textContent = totalValue + operationValue;
      }
      break;
    }
    default: {
      break;
    }
  }
}

function handleClickAC() {
  total.textContent = '0';
}

function getCalculatingTargets(totalValue) {
  const eachNumbers = totalValue.split(/[X+-/_]/);

  if (totalValue[0] === OPERATORS.SUBTRACT) {
    eachNumbers.shift();
    eachNumbers[0] = OPERATORS.SUBTRACT + eachNumbers[0];
  }

  return eachNumbers;
}

function getCalculatedValue(totalValue) {
  const calculatingTargets = getCalculatingTargets(totalValue);
  const operation = getOperator(totalValue);
  const result = calculate(calculatingTargets, operation);
  return result;
}

function getOperator(totalValue) {
  const withoutFirstTotalValues = totalValue.substring(1).split('');
  return withoutFirstTotalValues.find((value) => {
    if (
      value === OPERATORS.ADD ||
      value === OPERATORS.SUBTRACT ||
      value === OPERATORS.MULTIPLY ||
      value === OPERATORS.DIVIDE
    )
      return value;
  });
}

function calculate(calculatingTargets, operation) {
  const [leftValue, rightValue] = calculatingTargets;

  switch (operation) {
    case OPERATORS.ADD:
      return Number(leftValue) + Number(rightValue);
    case OPERATORS.SUBTRACT:
      return Number(leftValue) - Number(rightValue);
    case OPERATORS.MULTIPLY:
      return Number(leftValue) * Number(rightValue);
    case OPERATORS.DIVIDE:
      return Math.trunc(Number(leftValue) / Number(rightValue));
    default:
      return 0;
  }
}

function checkOverMaxDigits(totalValue, digitValue) {
  const digitValues = getCalculatingTargets(totalValue);
  const target = digitValues[digitValues.length - 1];

  return (target + digitValue).length > MAX_DIGITS;
}
