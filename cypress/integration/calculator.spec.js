/* eslint-disable no-undef */
import { ERROR_MESSAGE } from '../../src/js/constants';

describe('계산기 초기 화면 테스트', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('total의 초기 값은 0이다.', () => {
    cy.get('#total').should('have.text', '0');
  });
});

describe('계산기 기능 요구사항', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('2개의 숫자에 대해 덧셈이 가능하다', () => {
    cy.calculate('5+3=');
    cy.get('#total').should('have.text', '8');
  });

  it('2개의 숫자에 대해 뺄셈이 가능하다', () => {
    cy.calculate('10-7=');
    cy.get('#total').should('have.text', '3');
  });

  it('2개의 숫자에 대해 곱셈이 가능하다', () => {
    cy.calculate('6X4=');
    cy.get('#total').should('have.text', '24');
  });

  it('2개의 숫자에 대해 나눗셈이 가능하다', () => {
    cy.calculate('6/3=');
    cy.get('#total').should('have.text', '2');
  });

  it('AC(All Clear)버튼을 누르면 0으로 초기화된다.', () => {
    cy.clickDigit('1');
    cy.get('.modifier').click();
    cy.get('#total').should('have.text', '0');
  });

  it('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    cy.calculate('1111');

    cy.on('window:alert', (text) => {
      expect(text).to.contains(ERROR_MESSAGE.OVER_THREE_DIGITS);
    });
    cy.get('#total').should('have.text', '111');
  });

  it('계산 결과를 표현할 때 소수점 이하는 버림한다.', () => {
    cy.calculate('5/3=');
    cy.get('#total').should('have.text', '1');
  });
});

describe('추가 요구사항', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500');
  });

  it('음수 결과값에서 소수점을 버릴 때에는 버림이 아닌 올림을 한다.', () => {
    cy.calculate('-9=/4=');
    cy.get('#total').should('have.text', '-2');
  });

  it('연속적인 계산을 처리한다.', () => {
    cy.calculate('9X4/6=');
    cy.get('#total').should('have.text', '6');
  });
});
