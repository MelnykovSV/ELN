import { Compound } from './compound.js';

export class Scheme {
  #body;
  constructor() {
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
