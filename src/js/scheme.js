import { Compound } from './compound.js';

export class Scheme {
  #body;
  constructor() {
    this.#body = [];
    this.#body.push(new Compound());
  }
}
