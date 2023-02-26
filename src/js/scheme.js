import { Compound } from './compound.js';
import { renderCompoundForm } from './renderCompoundForm.js';

export class Scheme {
  static schemeGlobalID = 0;
  // #body;
  constructor({
    schemeGlobalID = (Scheme.schemeGlobalID += 1),
    body = [],
  } = {}) {
    this.schemeGlobalID = schemeGlobalID;
    this.body = body;
    // if (this.body.length === 0) {
    //   this.body.push(new Compound());
    // }
  }

  addCompound(globalCompoundID) {
    this.body.push(new Compound({}, globalCompoundID));
    // renderCompoundForm();
  }

  // get body() {
  //   return this.#body;
  // }
}
