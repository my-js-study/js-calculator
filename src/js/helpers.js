import { ERROR_MESSAGE } from './constants.js';

export function $(selector, scope = document) {
  if (!selector) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  return scope.querySelector(selector);
}

export function $$(selector, scope = document) {
  if (!selector) throw new Error(ERROR_MESSAGE.NO_SELECTOR);

  return Array.from(scope.querySelectorAll(selector));
}
