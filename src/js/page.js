import { Scheme } from './scheme';

export class Page {
  body;
  constructor({ body = [] } = {}) {
    this.body = body;
    if (this.body.length === 0) {
      this.body.push(new Scheme());
    }
  }

  //   get body() {
  //     return this.#body;
  //   }
}
