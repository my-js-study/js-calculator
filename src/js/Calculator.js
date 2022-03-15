import { ERROR_MESSAGE, MAX_DIGITS, OPERATORS } from './constants.js';
import { $ } from './helpers.js';

export default class Calaulator {
  constructor() {
    this.total = $('#total');
    this.digits = $('.digits');
    this.operations = $('.operations');
    this.ac = $('.modifier');

    this.isAlreadyTypeOperator = false;

    this.bindEvents();
  }

  bindEvents() {
    this.digits.addEventListener('click', this.handleClickDigits.bind(this));
    this.operations.addEventListener(
      'click',
      this.handleClickOperations.bind(this),
    );
    this.ac.addEventListener('click', this.handleClickAC.bind(this));
  }

  handleClickDigits(event) {
    const totalValue = total.textContent;
    const digitValue = event.target.textContent;

    if (this.checkOverMaxDigits(totalValue, digitValue)) {
      alert(ERROR_MESSAGE.OVER_THREE_DIGITS);
      return;
    }

    total.textContent =
      totalValue === '0' ? digitValue : totalValue + digitValue;
  }

  handleClickOperations(event) {
    const totalValue = total.textContent;
    const operationValue = event.target.textContent;

    if (this.isAlreadyTypeOperator && operationValue !== OPERATORS.EQUAL) {
      const result = this.getCalculatedValue(totalValue);
      total.textContent = result + operationValue;
      this.isAlreadyTypeOperator = false;
      return;
    }

    this.isAlreadyTypeOperator = true;

    if (operationValue === OPERATORS.EQUAL) {
      const result = this.getCalculatedValue(totalValue);
      total.textContent = result;
      this.isAlreadyTypeOperator = false;
      return;
    }

    total.textContent = totalValue + operationValue;
  }

  getCalculatedValue(totalValue) {
    const calculatingTargets = this.getCalculatingTargets(totalValue);
    const operation = this.getOperator(totalValue);
    const result = this.calculate(calculatingTargets, operation);
    return result;
  }

  handleClickAC() {
    total.textContent = '0';
  }

  calculate(calculatingTargets, operation) {
    const [leftValue, rightValue] = calculatingTargets;

    switch (operation) {
      case OPERATORS.ADD:
        return Number(leftValue) + Number(rightValue);
      case OPERATORS.SUBTRACT:
        return Number(leftValue) - Number(rightValue);
      case OPERATORS.MULTIPLY:
        return Number(leftValue) * Number(rightValue);
      case OPERATORS.DIVIDE:
        return leftValue > 0
          ? Math.floor(Number(leftValue) / Number(rightValue))
          : Math.ceil(Number(leftValue) / Number(rightValue));
    }
  }

  getOperator(totalValue) {
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

  checkOverMaxDigits(totalValue, digitValue) {
    const digitValues = this.getCalculatingTargets(totalValue);
    const target = digitValues[digitValues.length - 1];

    return (target + digitValue).length > MAX_DIGITS;
  }

  getCalculatingTargets(totalValue) {
    console.log(totalValue);
    const eachNumbers = totalValue.split(/[X+-/_]/);

    if (totalValue[0] === OPERATORS.SUBTRACT) {
      eachNumbers.shift();
      eachNumbers[0] = OPERATORS.SUBTRACT + eachNumbers[0];
    }

    return eachNumbers;
  }
}
