import { Scheme } from './scheme.js';
import { Compound } from './compound.js';
import { Fraction } from './fraction.js';
import { Page } from './page.js';
import { renderCompoundForm } from './renderCompoundForm.js';
import { conformsTo } from 'lodash';

const pageButton = document.querySelector('.page-button');
const schemeButton = document.querySelector('.scheme-button');
const compoundButton = document.querySelector('.compound-button');

const mainPage = new Page();
// mainPage = JSON.parse(localStorage.getItem('pageBody'));

const scheme = mainPage.body[0];
for (const item of scheme.body) {
  renderCompoundForm();
}

compoundButton.addEventListener('click', () => {
  scheme.addCompound();
  console.log('!!!');
  localStorage.setItem('pageBody', JSON.stringify(mainPage));
});

console.log(mainPage);
console.log(JSON.stringify(mainPage));
