import { Compound } from './compound.js';

export class Scheme {
  static schemeGlobalID = 0;
  #body;
  constructor() {
    this.schemeGlobalID = Scheme.schemeGlobalID += 1;
    this.#body = [];
    this.#body.push(new Compound());
  }

  addCompound() {
    this.#body.push(new Compound());
  }

  get body() {
    return this.#body;
  }
}
