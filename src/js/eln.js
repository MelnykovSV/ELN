import { Scheme } from './scheme.js';
import { Compound } from './compound.js';
import { Fraction } from './fraction.js';
import { Page } from './page.js';

const pageButton = document.querySelector('.page-button');
const schemeButton = document.querySelector('.scheme-button');
const compoundButton = document.querySelector('.compound-button');

const mainPage = new Page();
// mainPage = JSON.parse(localStorage.getItem('pageBody'));

const scheme = mainPage.body[0];

compoundButton.addEventListener('click', () => {
  scheme.addCompound();
  localStorage.setItem('pageBody', JSON.stringify(mainPage));
});

// scheme.addCompound();
// scheme.addCompound();

console.log(mainPage);
console.log(
  JSON.stringify(mainPage, (key, value) => {
    if (typeof key === 'string' && key.startsWith('#')) {
      return value; // include private properties
    }
    return value;
  })
);
