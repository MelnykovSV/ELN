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
const mainPage = document.querySelector('.main-page');
const mainCanvas = document.querySelector('.main-canvas');
const mainInput = document.querySelector('.main-input');

let globalCompoundID = parseInt(localStorage.getItem('globalCompoundID')) || 0;

let options = {
  width: 150,
  height: 150,
};

let smilesDrawer = new SmilesDrawer.Drawer(options);

compoundButton.addEventListener('click', () => {
  globalCompoundID += 1;
  localStorage.setItem('globalCompoundID', globalCompoundID);

  page.body[0].addCompound(globalCompoundID);
  renderCompoundForm(page.body[0].body[page.body[0].body.length - 1]);
  mainPage.lastChild.addEventListener('input', e => {
    if (e.target.nodeName === 'INPUT') {
      console.log(e.target);
      const compoundObject = page.body[0].body.find(
        item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
      );
      compoundObject[e.target.name] = e.target.value;
      localStorage.setItem('pageBody', JSON.stringify(page));
      if (e.target.name === 'smiles') {
        SmilesDrawer.parse(e.target.value, function (tree) {
          smilesDrawer.draw(
            tree,
            `canvas${e.currentTarget.dataset.id}`,
            'light',
            false
          );
        });
      }
    }
    // if (e.target.nodeName === 'INPUT') {
    //   const compoundObject = page.body[0].body.find(
    //     item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
    //   );
    //   compoundObject[e.target.name] = e.target.value;
    //   localStorage.setItem('pageBody', JSON.stringify(page));

    // }
  });
  localStorage.setItem('pageBody', JSON.stringify(page));
});

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
    renderCompoundForm(item);

    const canvas = document.querySelector(`#canvas${item.compoundGlobalID}`);
    SmilesDrawer.parse(item.smiles, function (tree) {
      smilesDrawer.draw(tree, `canvas${item.compoundGlobalID}`, 'light', false);
    });
  }
} else {
  console.log('local storage is empty');
  page.body.push(new Scheme());
}

const formsCollection = document.querySelectorAll('[data-id]');

for (item of formsCollection) {
  item.addEventListener('input', e => {
    if (e.target.nodeName === 'INPUT') {
      const compoundObject = page.body[0].body.find(
        item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
      );
      compoundObject[e.target.name] = e.target.value;
      localStorage.setItem('pageBody', JSON.stringify(page));

      if (e.target.name === 'smiles') {
        SmilesDrawer.parse(e.target.value, function (tree) {
          smilesDrawer.draw(
            tree,
            `canvas${e.currentTarget.dataset.id}`,
            'light',
            false
          );
        });
      }
    }
  });
}
