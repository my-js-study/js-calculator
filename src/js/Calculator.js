import { ERROR_MESSAGE, MAX_DIGITS, OPERATORS } from './constants.js';
import { $ } from './helpers.js';

function Calculator() {
  const total = $('#total');
  const digits = $('.digits');
  const operations = $('.operations');
  const ac = $('.modifier');

  let isAlreadyTypeOperator = false;

  bindEvents();

  function bindEvents() {
    digits.addEventListener('click', handleClickDigits.bind(this));
    operations.addEventListener('click', handleClickOperations.bind(this));
    ac.addEventListener('click', handleClickAC.bind(this));
  };

  function handleClickDigits(event) {
    const totalValue = total.textContent;
    const digitValue = event.target.textContent;

    if (checkOverMaxDigits(totalValue, digitValue)) {
      alert(ERROR_MESSAGE.OVER_THREE_DIGITS);
      return;
    }

    total.textContent =
      totalValue === '0' ? digitValue : totalValue + digitValue;
  };

  function handleClickOperations(event) {
    const totalValue = total.textContent;
    const operationValue = event.target.textContent;

    if (isAlreadyTypeOperator && operationValue !== OPERATORS.EQUAL) {
      const result = getCalculatedValue(totalValue);
      total.textContent = result + operationValue;
      isAlreadyTypeOperator = false;
      return;
    }

    isAlreadyTypeOperator = true;

    if (operationValue === OPERATORS.EQUAL) {
      const result = getCalculatedValue(totalValue);
      total.textContent = result;
      isAlreadyTypeOperator = false;
      return;
    }

    total.textContent = totalValue + operationValue;
  };

  function getCalculatedValue(totalValue) {
    const calculatingTargets = getCalculatingTargets(totalValue);
    const operation = getOperator(totalValue);
    const result = calculate(calculatingTargets, operation);
    return result;
  };

  function handleClickAC() {
    total.textContent = '0';
  };

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
    }
  };

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
  };

  function checkOverMaxDigits(totalValue, digitValue) {
    const digitValues = getCalculatingTargets(totalValue);
    const target = digitValues[digitValues.length - 1];

    return (target + digitValue).length > MAX_DIGITS;
  };

  function getCalculatingTargets(totalValue) {
    const eachNumbers = totalValue.split(/[X+-/_]/);

    if (totalValue[0] === OPERATORS.SUBTRACT) {
      eachNumbers.shift();
      eachNumbers[0] = OPERATORS.SUBTRACT + eachNumbers[0];
    }

    return eachNumbers;
  };
};

export default Calculator;
