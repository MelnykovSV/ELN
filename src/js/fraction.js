export class Fraction {
  #mass;
  #purity;
  #isNMR;
  #isLCMS;
  #comment;
  constructor() {
    this.#mass = null;
    this.#purity = null;
    this.#isNMR = false;
    this.#isLCMS = false;
    this.#comment = false;
  }
}
