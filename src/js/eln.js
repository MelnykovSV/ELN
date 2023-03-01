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

const sheet = document.querySelector('.sheet');

let globalCompoundID = parseInt(localStorage.getItem('globalCompoundID')) || 0;
let globalSchemeID = parseInt(localStorage.getItem('globalCompoundID')) || 0;

let options = {
  width: 150,
  height: 150,
};

let smilesDrawer = new SmilesDrawer.Drawer(options);

///Initial loading page data  from localstorage and renderinf of the page
let page = getFromLocalStorage();

console.log(page);

if (page === null) {
  page = new Page();
}

if (page.body.length !== 0) {
  for (let i = 0; i < page.body.length; i += 1) {
    const currentScemeID = page.body[i].globalSchemeID;
    sheet.insertAdjacentHTML(
      'beforeend',
      `<div class="scheme" data-schemeID='${currentScemeID}'></div>`
    );
    const scheme = page.body[i];

    console.log(scheme);
    const sortedSchemeBody = scheme.body.sort((a, b) => {
      a.compoundGlobalID - b.compoundGlobalID;
    });
    for (const item of sortedSchemeBody) {
      switch (item) {
        case sortedSchemeBody[sortedSchemeBody.length - 1]:
          renderCompoundForm(item, currentScemeID, 'last');
          break;
        default:
          renderCompoundForm(item, currentScemeID);
      }
      // renderCompoundForm(item);
      SmilesDrawer.parse(item.smiles, function (tree) {
        smilesDrawer.draw(
          tree,
          `canvas${item.compoundGlobalID}`,
          'light',
          false
        );
      });
    }
  }
} else {
  console.log('local storage is empty');
  page.body.push(new Scheme());
}

const schemes = document.querySelectorAll('.scheme');

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

for (scheme of schemes) {
  console.log(scheme);
  scheme.addEventListener('click', e => {
    const currentSchemeID = e.currentTarget.dataset.schemeid;
    console.log(currentSchemeID);

    if (e.target.name === 'addCompound') {
      e.preventDefault();
      globalCompoundID += 1;
      e.target.disabled = true;
      localStorage.setItem('globalCompoundID', globalCompoundID);
      page.body[currentSchemeID - 1].addCompound(globalCompoundID);
      renderCompoundForm(
        page.body[0].body[page.body[currentSchemeID - 1].body.length - 1],
        e.currentTarget.dataset.schemeid,
        'last'
      );
      console.log(`element: ${scheme}`);
      console.log(`last child: ${scheme.lastChild}`);
      if (scheme.lastChild) {
        scheme.lastChild.addEventListener('input', e => {
          textInputHandler(e, currentSchemeID);
        });
        scheme.lastChild.addEventListener('change', e => {
          checkboxClicksHandler(e, currentSchemeID);
        });
        localStorage.setItem('pageBody', JSON.stringify(page));
      }
    }
  });
}

schemeButton.addEventListener('click', () => {
  globalSchemeID += 1;
  localStorage.setItem('globalSchemeID', globalSchemeID);
  page.addScheme(globalSchemeID);
  localStorage.setItem('pageBody', JSON.stringify(page));
});

const formsCollection = document.querySelectorAll('[data-id]');

for (scheme of schemes) {
  console.log(scheme.dataset.schemeid);
  const currentSchemeID = scheme.dataset.schemeid;
  for (item of formsCollection) {
    item.addEventListener('input', e => {
      textInputHandler(e, currentSchemeID);
    });
    item.addEventListener('change', e => {
      checkboxClicksHandler(e, currentSchemeID);
    });
  }
}

///Checks if the target is text input and if it is - on change saves its value  to localstorage
/// If it is a SMILES input - draws molecule to canvas

function textInputHandler(e, id) {
  console.log('this:' + id);
  // e.currentTarget.dataset.globalSchemeID
  if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
    const compoundObject = page.body[id - 1].body.find(
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

function checkboxClicksHandler(e, id) {
  console.log('this:' + id);
  if (e.target.nodeName === 'INPUT' && e.target.type === 'checkbox') {
    const compoundObject = page.body[id - 1].body.find(
      item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
    );
    compoundObject[e.target.name] = e.target.checked;
    localStorage.setItem('pageBody', JSON.stringify(page));
  }
}

// console.log(
//   JSON.parse(
//     '{"body":[{"globalSchemeID":1,"body":[{"compoundGlobalID":1,"mw":null,"smiles":null,"isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null},{"compoundGlobalID":2,"mw":"25.8458","smiles":"cbxc","isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null},{"compoundGlobalID":3,"mw":"54.0916","smiles":"cccc","isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null},{"compoundGlobalID":4,"mw":null,"smiles":null,"isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null},{"compoundGlobalID":5,"mw":"67.1106","smiles":"ccccc","isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":"123"},{"compoundGlobalID":6,"mw":"100.204","smiles":"CCCCCCC","isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null},{"compoundGlobalID":7,"mw":"83.1533","smiles":"CCCccc","isTestSuccessful":true,"isScalingSuccessful":true,"fractions":[],"dbID":null},{"compoundGlobalID":8,"mw":"13.8348","smiles":"","isTestSuccessful":true,"isScalingSuccessful":false,"fractions":[],"dbID":null},{"compoundGlobalID":14,"mw":"123.218","smiles":"CCCCccccc","isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null},{"compoundGlobalID":24,"mw":null,"smiles":null,"isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null}]},{"globalSchemeID":2,"body":[{"compoundGlobalID":30,"mw":null,"smiles":null,"isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null}]},{"globalSchemeID":3,"body":[{"compoundGlobalID":31,"mw":null,"smiles":null,"isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null}]},{"globalSchemeID":4,"body":[{"compoundGlobalID":32,"mw":null,"smiles":null,"isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null}]},{"globalSchemeID":5,"body":[{"compoundGlobalID":33,"mw":null,"smiles":null,"isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null},{"compoundGlobalID":34,"mw":"25.8458","smiles":"cbxc","isTestSuccessful":false,"isScalingSuccessful":false,"fractions":[],"dbID":null}]}]}'
//   )
// );
