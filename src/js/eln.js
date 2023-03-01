import { Scheme } from './scheme.js';
import { Compound } from './compound.js';
import { Fraction } from './fraction.js';
import { Page } from './page.js';
import { renderCompoundForm } from './renderCompoundForm.js';

// import { conformsTo } from 'lodash';
import { getFromLocalStorage } from './localStorage.js';
// import { Drawer } from './../../node_modules/smiles-drawer/dist/smiles-drawer.min';
// const SmilesDrawer = require('smiles-drawer');
// const SmilesDrawer = require('./../../node_modules/smiles-drawer/dist/smiles-drawer.min');

const pageButton = document.querySelector('.page-button');
const schemeButton = document.querySelector('.scheme-button');
const compoundButton = document.querySelector('.compound-button');
const scheme = document.querySelector('.scheme');

let globalCompoundID = parseInt(localStorage.getItem('globalCompoundID')) || 0;
let globalSchemeID = parseInt(localStorage.getItem('globalCompoundID')) || 0;

let options = {
  width: 150,
  height: 150,
};

let smilesDrawer = new SmilesDrawer.Drawer(options);

///Initial loading page data  from localstorage and renderinf of the page
let page = getFromLocalStorage();

if (page === null) {
  page = new Page();
}

if (page.body.length !== 0) {
  const scheme = page.body[0];
  const sortedSchemeBody = scheme.body.sort((a, b) => {
    a.compoundGlobalID - b.compoundGlobalID;
  });
  for (const item of sortedSchemeBody) {
    switch (item) {
      case sortedSchemeBody[sortedSchemeBody.length - 1]:
        renderCompoundForm(item, 'last');
        break;
      default:
        renderCompoundForm(item);
    }
    // renderCompoundForm(item);
    SmilesDrawer.parse(item.smiles, function (tree) {
      smilesDrawer.draw(tree, `canvas${item.compoundGlobalID}`, 'light', false);
    });
  }
} else {
  console.log('local storage is empty');
  page.body.push(new Scheme());
}

/// This listener creates a new form on "Add compound" button click. It calculates new  globalCompoundID and saves new value to localStorage,
/// add new compound object to the page object, render the form, adds eventlisteners to it and saves new page object to localstorage

compoundButton.addEventListener('click', () => {
  globalCompoundID += 1;
  localStorage.setItem('globalCompoundID', globalCompoundID);
  page.body[0].addCompound(globalCompoundID);
  renderCompoundForm(page.body[0].body[page.body[0].body.length - 1], 'last');
  scheme.lastChild.addEventListener('input', textInputHandler);
  scheme.lastChild.addEventListener('change', checkboxClicksHandler);
  localStorage.setItem('pageBody', JSON.stringify(page));
});

scheme.addEventListener('click', e => {
  if (e.target.name === 'addCompound') {
    e.preventDefault();
    globalCompoundID += 1;
    e.target.disabled = true;
    localStorage.setItem('globalCompoundID', globalCompoundID);
    page.body[0].addCompound(globalCompoundID);
    renderCompoundForm(page.body[0].body[page.body[0].body.length - 1], 'last');
    scheme.lastChild.addEventListener('input', textInputHandler);
    scheme.lastChild.addEventListener('change', checkboxClicksHandler);
    localStorage.setItem('pageBody', JSON.stringify(page));
  }
});

schemeButton.addEventListener('click', () => {
  globalSchemeID += 1;
  localStorage.setItem('globalSchemeID', globalSchemeID);
  page.addScheme(globalSchemeID);
  localStorage.setItem('pageBody', JSON.stringify(page));
});

const formsCollection = document.querySelectorAll('[data-id]');

for (item of formsCollection) {
  item.addEventListener('input', textInputHandler);
  item.addEventListener('change', checkboxClicksHandler);
}

///Checks if the target is text input and if it is - on change saves its value  to localstorage
/// If it is a SMILES input - draws molecule to canvas

function textInputHandler(e) {
  if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
    const compoundObject = page.body[0].body.find(
      item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
    );
    compoundObject[e.target.name] = e.target.value;
    localStorage.setItem('pageBody', JSON.stringify(page));

    if (e.target.name === 'smiles') {
      const molWeightInput = e.currentTarget.querySelector(
        '.compound-form__mw-input'
      );
      SmilesDrawer.parse(e.target.value, function (tree) {
        smilesDrawer.draw(
          tree,
          `canvas${e.currentTarget.dataset.id}`,
          'light',
          false
        );
      });
      console.log(
        SmilesDrawer.parse(e.target.value, tree => {
          const formula = smilesDrawer.getMolecularFormula(tree);
          molWeightInput.value = calc(formula).mass;
          compoundObject.mw = calc(formula).mass;
          localStorage.setItem('pageBody', JSON.stringify(page));
        })
      );
    }
  }
}

///Checks if the target is checkbox and if it is - on change saves its value  to localstorage

function checkboxClicksHandler(e) {
  if (e.target.nodeName === 'INPUT' && e.target.type === 'checkbox') {
    const compoundObject = page.body[0].body.find(
      item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
    );
    compoundObject[e.target.name] = e.target.checked;
    localStorage.setItem('pageBody', JSON.stringify(page));
  }
}
