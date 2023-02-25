import { Scheme } from './js/scheme';

export class Page {
  #body;
  constructor() {
    this.#body = [];
    this.#body.push(new Scheme());
  }
}
