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
    console.log(operation);

    switch (operation) {
      case OPERATORS.ADD:
        return Number(leftValue) + Number(rightValue);
      case OPERATORS.SUBTRACT:
        return Number(leftValue) - Number(rightValue);
      case OPERATORS.MULTIPLY:
        return Number(leftValue) * Number(rightValue);
      case OPERATORS.DIVIDE:
        return leftValue > 0 ? Math.floor(Number(leftValue) / Number(rightValue)) : Math.ceil(Number(leftValue) / Number(rightValue));
    }
  }

  getOperator(totalValue) {
    const withoutFirstTotalValue = totalValue.substring(1) 
    for (const value of withoutFirstTotalValue) {
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
    const eachNumbers = totalValue.split(/[X+-/_]/);

    if(totalValue[0] === OPERATORS.SUBTRACT) {
      eachNumbers.shift();
      eachNumbers[0] = OPERATORS.SUBTRACT + eachNumbers[0]
    }

    return eachNumbers;
  }
}
