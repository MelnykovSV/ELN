import { Fraction } from './fraction';
export class Compound {
  static id = 0;
  #mw;
  #smiles;
  #isTestSuccessful;
  #isScalingSuccessful;
  #fractions;

  constructor() {
    Compound.id += 1;
    this.id = Compound.id;
    this.#mw = null;
    this.#smiles = null;
    this.#isTestSuccessful = false;
    this.#isScalingSuccessful = false;
    this.#fractions = [];
  }

  get isTestSuccessful() {
    return this.#isTestSuccessful;
  }
  get isScalingSuccessful() {
    return this.#isScalingSuccessful;
  }

  set isTestSuccessful(value) {
    if (typeof value === 'boolean') {
      this.#isTestSuccessful = value;
    } else {
      throw new Error('Value must be a boolean');
    }
  }
  set isScalingSuccessful(value) {
    if (typeof value === 'boolean') {
      this.#isScalingSuccessful = value;
    } else {
      throw new Error('Value must be a boolean');
    }
  }

  addFraction() {
    this.#fractions.push(new Fraction());
  }
}
