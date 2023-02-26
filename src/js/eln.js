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
    renderCompoundForm(item);
  }
} else {
  console.log('local storage is empty');
  page.body.push(new Scheme());
}

const formsCollection = document.querySelectorAll('[data-id]');

for (item of formsCollection) {
  //   if (e.target.nodeName === 'INPUT') {
  item.addEventListener('input', e => {
    if (e.target.nodeName === 'INPUT') {
      console.log(parseInt(e.currentTarget.dataset.id));
      const compoundObject = page.body[0].body.find(
        item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
      );
      // e.target.value
      compoundObject[e.target.name] = e.target.value;
      console.log(e.target.name);
      console.log(e.target.nodeName);
      localStorage.setItem('pageBody', JSON.stringify(page));
      console.log(page);
    }
  });
  //   }
}
console.log(formsCollection);

console.log(page);
