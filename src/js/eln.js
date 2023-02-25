import { Scheme } from './scheme.js';
import { Compound } from './compound.js';
import { Fraction } from './fraction.js';
import { Page } from './page.js';
import { renderCompoundForm } from './renderCompoundForm.js';
import { conformsTo } from 'lodash';
import { getFromLocalStorage } from './localStorage.js';

const pageButton = document.querySelector('.page-button');
const schemeButton = document.querySelector('.scheme-button');
const compoundButton = document.querySelector('.compound-button');

compoundButton.addEventListener('click', () => {
  page.body[0].addCompound();
  localStorage.setItem('pageBody', JSON.stringify(page));
});

let page = getFromLocalStorage();

if (page === null) {
  page = new Page();
}

if (page.body.length !== 0) {
  const scheme = page.body[0];
  for (const item of scheme.body) {
    renderCompoundForm();
  }
} else {
  console.log('local storage is empty');
  page.body.push(new Scheme());
}
