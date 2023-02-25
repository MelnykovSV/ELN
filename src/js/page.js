import { Scheme } from './scheme';

export class Page {
  #body;
  constructor() {
    this.#body = [];
    this.#body.push(new Scheme());
  }

  get body() {
    return this.#body;
  }
}
