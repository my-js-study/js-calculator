import { ERROR_MESSAGE, MAX_DIGITS, OPERATORS } from './constants.js';
import { on, qs, qsAll } from './helpers.js';

export default class Calaulator {
  constructor() {
    this.total = qs('#total');
    this.digits = qs('.digits');
    this.operations = qs('.operations');
    this.ac = qs('.modifier');

    this.bindEvents();
  }

  bindEvents() {
    on(this.digits, 'click', this.handleClickDigits.bind(this))
    on(this.operations, 'click', this.handleClickOperations.bind(this));
    on(this.ac, 'click', this.handleClickAC.bind(this));
  }

  handleClickDigits(event) {
    const totalValue = total.textContent;
    const digitValue = event.target.textContent;

    if (this.checkOverThreeDigits(totalValue, digitValue)) {
      alert(ERROR_MESSAGE.OVER_THREE_DIGITS);
      return;
    }

    total.textContent = totalValue === '0' ? digitValue : totalValue + digitValue;
  }

  handleClickOperations(event) {
    const totalValue = total.textContent;
    const operationValue = event.target.textContent;

    if (totalValue === '0') {
      alert(ERROR_MESSAGE.NO_NUMBER);
      return;
    }

    if (operationValue === OPERATORS.EQUAL) {
      const calculatingTargets = this.getCalculatingTargets(totalValue);
      const operation = this.getOperator(totalValue);
      const result = this.calculate(calculatingTargets, operation);
      total.textContent = result;
      return;
    }

    total.textContent = totalValue + operationValue;
  }

  handleClickAC() {
    total.textContent = '0'
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
        return Math.floor(Number(leftValue) / Number(rightValue));
    }
  }

  getOperator(totalValue) {
    for (const value of totalValue) {
      if (
        value === OPERATORS.ADD ||
        value === OPERATORS.SUBTRACT ||
        value === OPERATORS.MULTIPLY ||
        value === OPERATORS.DIVIDE
      )
        return value;
    }
  }

  checkOverThreeDigits(totalValue, digitValue) {
    const digitValues = this.getCalculatingTargets(totalValue);
    const target = digitValues[digitValues.length - 1];

    return (target + digitValue).length > MAX_DIGITS;
  }

  getCalculatingTargets(totalValue) {
    return totalValue.split(/[X+-/_]/);
  }
}
