import { Compound } from './compound.js';
import { renderCompoundForm } from './renderCompoundForm.js';

export class Scheme {
  static globalSchemeID = 0;
  // #body;
  constructor({
    globalSchemeID = (Scheme.globalSchemeID += 1),
    body = [],
  } = {}) {
    this.globalSchemeID = globalSchemeID;
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
