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
const mainPage = document.querySelector('.main-page');

compoundButton.addEventListener('click', () => {
  page.body[0].addCompound();
  renderCompoundForm(page.body[0].body[page.body[0].body.length - 1]);
  mainPage.lastChild.addEventListener('input', e => {
    if (e.target.nodeName === 'INPUT') {
      console.log(e.target);
      console.log(e.currentTarget);
      console.log(parseInt(e.currentTarget.dataset.id));
      const compoundObject = page.body[0].body.find(
        item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
      );
      compoundObject[e.target.name] = e.target.value;
      localStorage.setItem('pageBody', JSON.stringify(page));
    }
  });
  localStorage.setItem('pageBody', JSON.stringify(page));
});

let page = getFromLocalStorage();

if (page === null) {
  page = new Page();
}

if (page.body.length !== 0) {
  const scheme = page.body[0];
  for (const item of scheme.body) {
    renderCompoundForm(item);
  }
} else {
  console.log('local storage is empty');
  page.body.push(new Scheme());
}

const formsCollection = document.querySelectorAll('[data-id]');

for (item of formsCollection) {
  item.addEventListener('input', e => {
    if (e.target.nodeName === 'INPUT') {
      console.log(parseInt(e.currentTarget.dataset.id));
      const compoundObject = page.body[0].body.find(
        item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
      );
      compoundObject[e.target.name] = e.target.value;
      localStorage.setItem('pageBody', JSON.stringify(page));
    }
  });
}
console.log(formsCollection);

console.log(page);
