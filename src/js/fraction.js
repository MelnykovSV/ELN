export class Fraction {
  static fractionGlobalID = 0;
  #mass;
  #purity;
  #isNMR;
  #isLCMS;
  #comment;
  constructor() {
    this.fractionGlobalID = Fraction.fractionGlobalID += 1;
    this.#mass = null;
    this.#purity = null;
    this.#isNMR = false;
    this.#isLCMS = false;
    this.#comment = false;
  }
}
