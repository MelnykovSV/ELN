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

const sheet = document.querySelector('.sheet');

let globalCompoundID = parseInt(localStorage.getItem('globalCompoundID')) || 0;
let globalSchemeID = parseInt(localStorage.getItem('globalSchemeID')) || 0;

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
  for (let i = 0; i < page.body.length; i += 1) {
    const currentScemeID = page.body[i].globalSchemeID;
    sheet.insertAdjacentHTML(
      'beforeend',
      `<div class="scheme" data-schemeID='${currentScemeID}'></div>`
    );
    const scheme = page.body[i];
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
}

const schemes = document.querySelectorAll('.scheme');

/// This listener creates a new form on "Add compound" button click. It calculates new  globalCompoundID and saves new value to localStorage,
/// add new compound object to the page object, render the form, adds eventlisteners to it and saves new page object to localstorage

for (const scheme of schemes) {
  scheme.addEventListener('click', e => {
    const currentSchemeID = e.currentTarget.dataset.schemeid;

    if (e.target.name === 'addCompound') {
      e.preventDefault();
      globalCompoundID += 1;
      e.target.disabled = true;
      // console.log(e.currentTarget.parentElement);
      localStorage.setItem('globalCompoundID', globalCompoundID);
      page.body[currentSchemeID - 1].addCompound(globalCompoundID);
      renderCompoundForm(
        page.body[currentSchemeID - 1].body[
          page.body[currentSchemeID - 1].body.length - 1
        ],
        e.currentTarget.dataset.schemeid,
        'last'
      );
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
  console.log('scheme id before adding: ' + globalSchemeID);
  globalSchemeID += 1;
  const currentSchemeID = globalSchemeID;
  console.log('scheme id after adding: ' + currentSchemeID);
  localStorage.setItem('globalSchemeID', currentSchemeID);
  page.addScheme(currentSchemeID);
  sheet.insertAdjacentHTML(
    'beforeend',
    `<div class="scheme" data-schemeID='${currentSchemeID}'></div>`
  );
  globalCompoundID += 1;
  const currentCompoundID = globalCompoundID;
  localStorage.setItem('globalCompoundID', globalCompoundID);
  console.log(page.body[currentSchemeID - 1]);
  page.body[currentSchemeID - 1].addCompound(currentCompoundID);
  renderCompoundForm(
    page.body[currentSchemeID - 1].body[0],
    currentSchemeID,
    'last'
  );
  console.log(
    `added new scheme with id ${currentSchemeID} with a new form(id: ${currentCompoundID})`
  );

  const addedScheme = document.querySelector('.sheet').lastChild;
  const lastChild = addedScheme.lastChild;

  console.log('currentSchemeID!!!!!' + currentSchemeID);
  console.log(addedScheme);
  console.log(addedScheme.lastChild);

  addedScheme.addEventListener('click', e => {
    const currentSchemeID = e.currentTarget.dataset.schemeid;
    // console.log(schemes);
    // console.log(currentSchemeID);
    console.log(addedScheme);

    if (e.target.name === 'addCompound') {
      e.preventDefault();
      globalCompoundID += 1;
      e.target.disabled = true;
      // console.log(e.currentTarget.parentElement);
      localStorage.setItem('globalCompoundID', globalCompoundID);
      page.body[currentSchemeID - 1].addCompound(globalCompoundID);
      renderCompoundForm(
        page.body[currentSchemeID - 1].body[
          page.body[currentSchemeID - 1].body.length - 1
        ],
        e.currentTarget.dataset.schemeid,
        'last'
      );
      console.log(addedScheme);
      console.log(addedScheme.lastChild);
      if (addedScheme.lastChild) {
        addedScheme.lastChild.addEventListener('input', e => {
          textInputHandler(e, currentSchemeID);
        });
        addedScheme.lastChild.addEventListener('change', e => {
          checkboxClicksHandler(e, currentSchemeID);
        });
        localStorage.setItem('pageBody', JSON.stringify(page));
      }
    }
  });

  if (addedScheme.lastChild) {
    addedScheme.lastChild.addEventListener('input', e => {
      textInputHandler(e, currentSchemeID);
    });
    addedScheme.lastChild.addEventListener('change', e => {
      checkboxClicksHandler(e, currentSchemeID);
    });
    localStorage.setItem('pageBody', JSON.stringify(page));
  } else {
    alert('UNKNOWN ERROR OCCURED!!! PLEASE RELOAD THE PAGE');
  }

  localStorage.setItem('pageBody', JSON.stringify(page));
});

const formsCollection = document.querySelectorAll('[data-id]');
console.log(formsCollection);

// for (scheme of schemes) {
//   const currentSchemeID = scheme.dataset.schemeid;
//   for (item of formsCollection) {
//     console.log(item.dataset.id);
//     item.addEventListener('input', e => {
//       textInputHandler(e, currentSchemeID);
//     });
//     item.addEventListener('change', e => {
//       checkboxClicksHandler(e, currentSchemeID);
//     });
//   }
// }
for (const form of formsCollection) {
  form.addEventListener('input', e => {
    console.log(form.parentNode.dataset.schemeid);
    console.log(form);
    textInputHandler(e, form.parentNode.dataset.schemeid);
  });
  form.addEventListener('change', e => {
    checkboxClicksHandler(e, form.parentNode.dataset.schemeid);
  });
}

// for (let i = 0; i < formsCollection.length; i += 1) {
//   formsCollection[i].addEventListener('input', e => {
//     console.log(formsCollection[i].parentNode.dataset.schemeid);
//     console.log(formsCollection[i]);
//     textInputHandler(e, formsCollection[i].parentNode.dataset.schemeid);
//   });
//   formsCollection[i].addEventListener('change', e => {
//     checkboxClicksHandler(e, formsCollection[i].parentNode.dataset.schemeid);
//   });
// }

///Checks if the target is text input and if it is - on change saves its value  to localstorage
/// If it is a SMILES input - draws molecule to canvas
console.log(page);
function textInputHandler(e, schemeID) {
  console.log('this:' + schemeID);
  // e.currentTarget.dataset.globalSchemeID
  if (e.target.nodeName === 'INPUT' && e.target.type === 'text') {
    const compoundObject = page.body[schemeID - 1].body.find(
      item => item.compoundGlobalID === parseInt(e.currentTarget.dataset.id)
    );

    console.log(page.body[schemeID - 1].body);
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

      SmilesDrawer.parse(e.target.value, tree => {
        const formula = smilesDrawer.getMolecularFormula(tree);
        molWeightInput.value = calc(formula).mass;
        compoundObject.mw = calc(formula).mass;
        localStorage.setItem('pageBody', JSON.stringify(page));
      });
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
